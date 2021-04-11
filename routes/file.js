const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
 
const router = express.Router();
 
cloudinary.config({
    cloud_name: process.env.cloudinary_cloudname,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'upload',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => 'computed-filename-using-request',
    api_key: process.env.cloudinary_api_key
  }
});

 
const parser = multer({ storage: storage });
 
router.post('/', parser.single('image'), function (req, res) {
  res.json(req.file);
});

module.exports = router;