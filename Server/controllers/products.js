const Product = require("../models/products");
const {StatusCodes} = require("http-status-codes")
const cloudinary = require("../utils/cloudinary");
const { NotFound } = require("../errors/indexErrors")

//Get all Products
const getAllProducts = async (req , res)=>{
    const products = await Product.find().sort("date");
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
const createProduct = async (req , res)=>{

    const {name , price , category , availableSizes , description , available} = req.body

    const imageUrl = req.file.path;

   // const result = await cloudinary.uploader.upload(image , {folder : "products"})
   //const product = await Product.create({name , price , category , availableSizes , description , available});  + image
  
  
   const product = await Product.create({name , price , category , availableSizes , description , available , image : imageUrl});
    res.status(StatusCodes.CREATED).json({product});
}


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