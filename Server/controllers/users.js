const {NotFound, CustomError, BadRequest} = require("../errors/indexErrors");
const cloudinary = require("../utils/cloudinary");
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

//get current user
const getCurrentUser = async(req , res)=>{
    const user = await User.findById({_id : req.user.userID}).select("-password");
    if(!user) throw new NotFound("not logged in")
    res.status(StatusCodes.OK).json({user});
}

const uploadAvatar = async (req , res)=>{
    if (!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please upload an image" });
    }
    
    const user = await User.findById(req.user.userID);
    if(!user) throw new NotFound(`no user with the id ${req.user.userID}`);

    if (user.avatar && user.avatar.publicId) {
        await cloudinary.uploader.destroy(user.avatar.publicId);
      }

      user.avatar = {url: req.file.path , publicId: req.file.filename};
      await user.save();

      res.status(StatusCodes.OK).json({avatar : user.avatar.url});
}

const updateUser = async(req , res)=>{
    const {name , phone} = req.body;

    if(!phone && !name) throw new BadRequest("at least update one field");
    const user = await User.findByIdAndUpdate({_id : req.params.id} , {name , phone} , {new:true})
    if(!user) throw new NotFound(`no user with the id : ${req.params.userID}`)

        res.status(StatusCodes.OK).json({user});
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



//switch to admin
const switchToAdmin = async (req , res)=>{
    const isAdmin = req.user.role === "superAdmin";
    const {id : userID} = req.params;
    const user = await User.findById({_id : userID});
    if(!user) throw new NotFound(`no user with the id : ${userID}`);
    
    if(isAdmin) {
        if(user.role === "admin"){
            user.role = "client"
            user.save();
        }else if(user.role === "client"){
            user.role = "admin";
            await user.save();
        }
        res.status(StatusCodes.OK).json({user});
    }else{
        throw new CustomError("Only super Admins are allowed to add new admins");
    }
}


module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    BlockUser,
    switchToAdmin,
    uploadAvatar,
    getCurrentUser
}