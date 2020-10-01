const cloudinary = require('cloudinary')
const config = require('config')
cloudinary.config({
    cloud_name: 'mernapp',
    api_key: config.get('CLOUDINARY_APP_ID'),
    api_secret: config.get('CLOUDINARY_APP_SECRET')
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: 'auto',
            folder: folder
        })
    })
}