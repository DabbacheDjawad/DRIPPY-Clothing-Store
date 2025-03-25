const {StatusCodes} = require("http-status-codes");

const errorHandlerMiddleware = (err , req , res , next) =>{
    let customErr = {
        msg : err.message || "something Went Wrong , Try Again Later",
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if(err.code && err.code == 11000){
        customErr.statusCode = StatusCodes.BAD_REQUEST;
        customErr.msg = `Duplicate Value for the Field ${Object.keys(err.keyValue)}`;
    }


    if(err.name && err.name == "ValidationError"){
        customErr.msg = Object.values(err.errors).map(item=>item.message).join(",");
        customErr.statusCode = StatusCodes.UNAUTHORIZED;
    }


    if(err.name == "CastError"){
        customErr.msg = `no item with the id : ${err.value}`
        customErr.statusCode = StatusCodes.NOT_FOUND;
    }

    return res.status(customErr.statusCode).json({msg : customErr.msg});
}

module.exports = errorHandlerMiddleware;