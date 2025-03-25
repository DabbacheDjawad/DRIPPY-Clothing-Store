const BadRequest= require("./BadRequest")
const Unauthenticated= require("./Unauthenticated")
const NotFound= require("./NotFound");
const CustomError = require("./CustomError");

module.exports = {
    BadRequest,
    Unauthenticated,
    NotFound,
    CustomError
}