const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : "Clothing-Store",
        transformation : [{width : 700 , height : 700 , crop : "limit"}]
    }
});

const upload = multer({storage});
module.exports = upload;