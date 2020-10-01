const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/userModel')

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        const decoded = jwt.decode(token, config.get('jwtSecret'))
        const user = await User.findOne({ socialId: decoded._id, 'jwtToken': token })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }
    catch (e) {
        res.status(401).send({ msg: 'autorization required' })
    }
}

module.exports = auth