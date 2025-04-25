require("dotenv").config();
require("express-async-errors");

//extra security packages
const helmet = require("helmet");
// const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

//express
const express = require("express");
const app = express();
//port
const port = process.env.PORT || 3000;

//connect DB
const connectDB = require("./db/connectDB");

//auth middleware
const {authMiddleware , adminAuth , userBlock} = require("./middleware/authentication")


//routes
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const authRouter = require("./routes/auth");

//error handler middleware
const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFound = require("./middleware/not-found");



app.get("/" , (req , res)=>{
    res.send("DRIPPY : ONLINE CLOTHING STORE")
})
app.use(express.json())


//security packages
app.use(rateLimit({
    windowMs : 15*60*1000,
    max : 100,
  }));
  app.use(helmet());
  // app.use(cors());
  app.use(xss());

//routes
app.use("/api/v1/users" , authMiddleware, adminAuth , userBlock , usersRouter);
app.use("/api/v1/products" ,productsRouter);
app.use("/api/v1/orders", authMiddleware , adminAuth , userBlock , ordersRouter);
app.use("/api/v1/auth" ,authRouter);


//error handler middleware
app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async()=>{
  try{
    await connectDB(process.env.MONGO_URI);
    app.listen(3000 , ()=>{console.log(`listening to port ${port}`)})
  }catch(error){
    console.log(error);
  }
}
start();
