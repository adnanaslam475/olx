const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    token: {
        type: String
    },
    socialId: {
        type: String
    },
    picture: {
        type: String
    },
    jwtToken:{
        type:String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    // followers: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    // following: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }]
}, {
    timestamps: true
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    console.log(user)
    const token = jwt.sign({ _id: user._id.toString() },
        config.get('jwtSecret'), { expiresIn: '1 hour' })
    console.log(token)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)
module.exports = User