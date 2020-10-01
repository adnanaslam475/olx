const express = require('express')
const router = express.Router()
const fs = require('fs')
const cloudinary = require('./cloudinary')
const upload = require('./multer')
const Ads = require('../models/adsModel')
const auth = require('../middleware/auth')


router.post('/ads/images', upload.array('images'), async (req, res) => {
    const uploader = async path => await cloudinary.uploads(path, 'Images');
    try {
        const urls = []
        for (const file of req.files) {
            const { path } = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        res.status(200).json({ msg: 'images uploaded successfully', data: urls })
    } catch (e) {
        res.status(405).json({ msg: 'cannot uploaded' })
    }
})

router.post('/adpost', auth, async (req, res) => {
    const { title, location, category, price, latitude, longitude, urls } = req.body
    console.log(req.body)
    const todo = new Ads({
        title: title,
        urls: urls,
        category, category,
        price: price,
        latitude: latitude,
        longitude: longitude,
        location: location,
        owner: req.user._id
    })
    try {
        await todo.save()
        res.status(201).json(todo)
    } catch (e) {
        res.status(400).send({ msg: 'failed to add posts' })
    }
})


router.get('/api/getAds', async (req, res) => {
    await Ads.find()
        // .sort({ date: -1 })
        .then(todos => {
            res.json(todos)
        })
        .catch(err => {
            res.status(400).send({ msg: 'failed to fetch todos' })
        })
})

// router.get('/api/getAds', async (req, res) => {
//     try {
//         const ads = await Ads.find()
//             .sort({ date: -1 })
//         res.json(ads)
//         console.log(ads)
//     }
//     catch (e) {
//         res.send({ msg: 'failed' })
//     }

// .then(ads =>{ res.json({ads}),
// console.log(ads)})
// .catch(err => {
//     res.status(400).send({ msg: 'failed to fetch ads' })
// })
// })

module.exports = router