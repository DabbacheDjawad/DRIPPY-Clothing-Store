
const jwt = require("jsonwebtoken");
const {StatusCodes} = require("http-status-codes");
const Unauthenticated = require("../errors/Unauthenticated");

const authMiddleware = async (req , res , next)=>{

    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer")) throw new Unauthenticated("Invalid Authentication");

    const token = authHeader.split(" ")[1];

    try{
        const payload = jwt.verify(token , process.env.JWT_SECRET);
        req.user = {userID : payload.userID , name : payload.name , role : payload.role}
        next();
    }catch(error){
        throw new Unauthenticated(error);
    }
}

//for admin logins
const adminAuth = async (req , res , next)=>{
    if(req.user.role !== "admin"){
        return res.status(StatusCodes.UNAUTHORIZED).json({message : "only admins are allowed"})
    };
    next();
}

module.exports = {authMiddleware , adminAuth};