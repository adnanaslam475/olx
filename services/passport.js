const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require("passport");
const jwt = require('jsonwebtoken')
const config = require('config');
const User = require('../models/userModel')

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        clientID: config.get('GOOGLE_APP_ID'),
        clientSecret: config.get('GOOGLE_APP_SECRET'),
        callbackURL: "/auth/google/callback",
        proxy: true
    },
        (accessToken, refreshToken, profile, done) => {

            User.findOne({ socialId: profile.id })
                .then(existingUser => {
                    if (existingUser) {
                        done(null, existingUser)
                    }
                    else {
                        const token = jwt.sign({ _id: profile.id.toString() },
                            config.get('jwtSecret'), { expiresIn: '1 hour' })
                        console.log('created', token)
                        new User({
                            username: profile.displayName,
                            socialId: profile.id,
                            token: accessToken,
                            jwtToken: token,
                            picture: profile.photos[0].value
                        }).save().then(user => {
                            done(null, user)
                        }).catch(e => {
                            console.log('not save', e)
                        })
                    }
                })
        })
)

passport.use(new FacebookStrategy({
    clientID: config.get('FACEBOOK_APP_ID'),
    clientSecret: config.get('FACEBOOK_APP_SECRET'),
    profileFields: ['id', 'displayName', 'photos'],
    callbackURL: "/auth/facebook/callback",
    enableProof: true,
    proxy: true,
},
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ socialId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser)
                } else {
                    new User({
                        username: profile.displayName,
                        socialId: profile.id,
                        token: accessToken,
                        picture: profile.photos[0].value
                    }).save()
                        .then(user => {
                            done(null, user)
                        }).catch(e => {
                            console.log('not save', e)
                        })
                }
            })
    }
))