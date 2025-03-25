const {StatusCodes} = require("http-status-codes")
const {BadRequest, Unauthenticated} = require("../errors/indexErrors")

const User = require("../models/users");
const register = async(req , res) =>{
    const user = await User.create({...req.body});
    const token = await user.createJWT();
    const date = new Date();
    user.registerDate =`${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()}`;    
    res.status(StatusCodes.CREATED).json({user : {name : user.name , role : user.role ,registerDate : user.registerDate} , token});
}


const login = async (req , res) =>{
    const {email , password} = req.body;
    
    if(!email || !password) throw new BadRequest("missing password or email");

    const user = await User.findOne({email});
    if(!user) throw new Unauthenticated("Invalid Credentials")

    const isMatched = await user.comparePasswords(password);
    if(!isMatched) throw new Unauthenticated("Wrong email or Password");    

    const token = await user.createJWT();
    
    res.status(StatusCodes.OK).json({user : {name : user.name , role : user.role} , token})
}

module.exports = {login , register}