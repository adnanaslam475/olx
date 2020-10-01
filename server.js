const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('config')
const app = express()
const mongoose = require('mongoose')
require('./services/passport')
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))

app.use(bodyParser.json())
const cookieSession = require('cookie-session')
const passport = require('passport')
app.use(cors())

app.use('/', require('./routes/adsRoute'))
app.use('/', require('./routes/userRoute'))

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [config.get('cookieKey')]
    })
)

app.use(passport.initialize())
app.use(passport.session())
app.get('/g', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get("/auth/google/callback", passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3000/')
})

app.get('/f', passport.authenticate('facebook'));
app.get("/auth/facebook/callback", passport.authenticate('facebook'), (req, res) => {
    res.redirect('http://localhost:3000/')
})

app.get('/api/user', (req, res) => {
    res.status(200).send(req.user)
})

app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log("local MongoDB connected..."))
    .catch(() => console.log('error to connect db'))
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT)
})
    // taskkill /f /im node.exe
    // mongodb://127.0.0.1:27017/task-manager-api
    // const db = config.get('mongoURI')