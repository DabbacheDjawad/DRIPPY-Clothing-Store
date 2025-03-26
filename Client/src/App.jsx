
import {Route , Routes} from "react-router-dom"
import Home from "./Pages/Home"
import ShoppingCart from "./Pages/ShoppingCart"
import Checkout from "./Pages/Checkout"
import Navbar from "./Components/Navbar";
import ProductDetails from "./Pages/ProductDetails"
import { CartProvider } from "./Context/CartContext"
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard"
import Products from "./Pages/Products";
import AddProduct from "./Pages/AddProduct";
import Orders from "./Pages/Orders";
import AdminProductDetails from "./Pages/AdminProductDetails";
function App() {
  return (
    <>
    <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Checkout" element={<Checkout />}/>
          <Route path="/productDetails/:id" element={<ProductDetails />}></Route>
          <Route path="/Cart" element={<ShoppingCart />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />}/>
          <Route path="/admin/products" element={<Products />}/>
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/:id" element={<AdminProductDetails/>}/> 
          <Route path="/admin/orders" element={<Orders/>}/>
        </Routes>
      </CartProvider>
    </>
  )
}

export default App
