const Order = require("../models/orders");
const Product = require("../models/products")
const {StatusCodes} = require("http-status-codes");
const {indexErrors, BadRequest, NotFound} = require("../errors/indexErrors")


//Get all Orders
const getAllOrders = async (req , res)=>{
    const orders = await Order.find()
        .populate("user", "name email").sort("createdAt");

    res.status(StatusCodes.OK).json({ orders, count: orders.length });
    
}


//get Single Order
const getOrder = (req , res)=>{
    res.send("Get Single Order");
}


//Create Order
const createOrder = async (req , res)=>{
    const {products , status} = req.body;
    const userId = req.user.userID;
    if(!status) throw new BadRequest("Please provide the status");

    if(!products || products.length === 0) throw new BadRequest("Please Provide a user and a product");

    const productsIds = products.map(p=>p.product);
    const foundProducts = await Product.find({_id : {$in : productsIds}});
    
    if(foundProducts.length !== products.length) throw new BadRequest("one or more wrong products (doesnt exist)");

    const order = await Order.create({user : userId , products , status});
    res.status(StatusCodes.CREATED).json({ order });

}


//Update Order
const updateOrder = async (req , res)=>{
    const { id: orderID } = req.params;
    const { status, products } = req.body;


    const order = await Order.findById(orderID);
    if (!order) throw new NotFound(`No Order with the id ${orderID}`);

 
    if (products && products.length > 0) {
        const productIds = products.map(p => p.product);
        const foundProducts = await Product.find({ _id: { $in: productIds } });

        if (foundProducts.length !== products.length) {
            throw new BadRequest("One or more products do not exist");
        }

        order.products = products; 
    }


    if (status) {
        const validStatuses = ["pending", "shipped", "delivered"];
        if (!validStatuses.includes(status)) {
            throw new BadRequest("Invalid status value");
        }
        order.status = status;
    }


    const updatedOrder = await order.save();

    res.status(StatusCodes.OK).json({ order: updatedOrder });
}


//Delete Order
const deleteOrder = async (req , res)=>{
    
    const {id : orderID} = req.params;
    const order =await Order.findOneAndDelete({_id : orderID});
    if(!order) throw new NotFound(`no Order with the id : ${orderID}`);

    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}