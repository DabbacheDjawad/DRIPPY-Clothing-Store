
import {Route , Routes} from "react-router-dom"
import Home from "./Pages/Home"
import ShoppingCart from "./Pages/ShoppingCart"
import Checkout from "./Pages/Checkout"
import Navbar from "./Components/Navbar";
import ProductDetails from "./Pages/ProductDetails"
import { CartProvider } from "./Context/CartContext"
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
        </Routes>
      </CartProvider>
    </>
  )
}

export default App
