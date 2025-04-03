const {NotFound} = require("../errors/indexErrors");
const User = require("../models/users");
const { StatusCodes } = require("http-status-codes");
//Get all users
const getAllUsers = async (req , res)=>{
    const users = await User.find().sort("date");
    res.status(StatusCodes.OK).json({users , count : users.length});
}


//getSingleUser
const getUser = async(req , res)=>{
    const {id : userID} = req.params;
    
    const user = await User.findById({_id : userID});
    if(!user) throw new NotFound(`no user with the id : ${userID}`);
    res.status(StatusCodes.OK).json({user})
}


//Create Admin
const createAdmin = async(req , res)=>{
    const user = await User.create({...req.body , role : "admin"});
    res.status(StatusCodes.CREATED).json({user});
}


//Delete User
const deleteUser = async (req , res)=>{
    const {id : userID} = req.params;
    const user = await User.findOneAndDelete({_id : userID});
    if(!user) throw new NotFound(`no user with the id : ${userID}`);
    res.status(StatusCodes.OK).send();
}


//block User
const BlockUser = async(req , res)=>{
    const {id : userID} = req.params;
    const user = await User.findById({_id:userID})
    
    
    if(!user) throw new NotFound(`No user with the id : ${userID}`)
    
    user.isBlocked = !user.isBlocked;
    await user.save();    
    res.status(StatusCodes.OK).json({user});
}
module.exports = {
    getAllUsers,
    getUser,
    createAdmin,
    deleteUser,
    BlockUser
}