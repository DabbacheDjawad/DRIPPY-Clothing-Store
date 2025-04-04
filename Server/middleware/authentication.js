
const jwt = require("jsonwebtoken");
const {StatusCodes} = require("http-status-codes");
const Unauthenticated = require("../errors/Unauthenticated");

const authMiddleware = async (req , res , next)=>{

    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer")) throw new Unauthenticated("Invalid Authentication");

    const token = authHeader.split(" ")[1];

    try{
        const payload = jwt.verify(token , process.env.JWT_SECRET);
        req.user = {userID : payload.userID , name : payload.name , role : payload.role , isBlocked : payload.isBlocked}
        next();
    }catch(error){
        throw new Unauthenticated(error);
    }
}

//for admin logins
const adminAuth = async (req , res , next)=>{
    if(req.user.role === "client"){
        return res.status(StatusCodes.UNAUTHORIZED).json({message : "only admins and super Admins are allowed"})
    };
    next();
}

//for blocking users
const userBlock =(req , res ,next)=>{
    if(req.user.isBlocked === true) return res.status(StatusCodes.UNAUTHORIZED)
        .json({message : "Account Blocked , Can not Enter"})
        next();
}

module.exports = {authMiddleware , adminAuth , userBlock};