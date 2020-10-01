const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const adsSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    price: {
        type: Number
    },
    urls: [{
        type: String
    }],
    postedAt:
    {
        type: Date, default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Ads = mongoose.model('Ads', adsSchema)
module.exports = Ads