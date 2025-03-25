// In your upload middleware file
const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Clothing-Store",
        transformation: [{width: 700, height: 700, crop: "limit"}]
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
});

// Export both single and array upload options
module.exports = {
    singleUpload: upload.single('image'),
    arrayUpload: upload.array('image', 10) // Max 10 images
};