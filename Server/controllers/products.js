const Product = require("../models/products");
const {StatusCodes} = require("http-status-codes")
const cloudinary = require("../utils/cloudinary");
const { NotFound } = require("../errors/indexErrors")

//Get all Products
const getAllProducts = async (req , res)=>{    
    const products = await Product.find().sort("-date");
    res.status(StatusCodes.OK).json({products , count : products.length});
}


//get Single Product
const getProduct = async (req , res)=>{

    const {id : productID} = req.params;
    const product = await Product.findById({_id : productID});
    if(!product) throw new NotFound(`No Product with the id : ${productID}`);

    res.status(StatusCodes.OK).json({product});
}


//Create Product
const createProduct = async (req, res) => {
    const { name, price, category, availableSizes, description, available } = req.body;

    // multiple images
    if (!req.files || req.files.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please upload at least one image" });
    }

        // Process all uploaded images
        const imageUrls = await Promise.all(
            req.files.map(file => {
                // For Cloudinary via multer-storage-cloudinary, path is already available                
                return { url: file.path, publicId: file.filename };
            })
        );


        const product = await Product.create({
            name,
            price,
            category,
            availableSizes,
            description,
            available,
            image: imageUrls // Store array of images
        });

        res.status(StatusCodes.CREATED).json({ product });
};


//Update Product
const updateProduct = async (req , res)=>{
    const {name , price , category , description , available , availableSizes} = req.body;
    const {id : productID} = req.params;
    const product = await Product.findOneAndUpdate({_id : productID},
    {name , price , category , description , available , availableSizes} , {new:true})
    if(!product) throw new NotFound(`no product with the id : ${productID}`)
    res.status(StatusCodes.OK).json({product});
}


//Delete Product
const deleteProduct = async (req , res)=>{
    const {id : productID} = req.params;
    const product = await Product.findByIdAndDelete({_id : productID});

    if(!product) throw new NotFound(`no product with the id : ${productID}`);
    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}