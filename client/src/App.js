import './App.css';
import Footer from './customer/components/footer/Footer'
import CheckOut from './customer/components/checkOut/CheckOut';
import Cart from './customer/components/cart/Cart';
import Navigation from './customer/components/navigation/Navigation';
import Product from "./customer/components/product/Product";
import Order from './customer/components/order/Order';
import HomePage from './customer/pages/homePage/HomePage';
import { BrowserRouter } from "react-router-dom";
import OrderDetails from './customer/components/order/OrderDetails';
import ProductDetails from "./customer/components/productDetails/ProductDetails";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div>
        {/* <HomePage /> */}
        {/* <Order /> */}
        {/* <OrderDetails /> */}
        {/* <Product /> */}
        {/* <Product /> */}
        <ProductDetails />
      </div>
      <Footer />
    </div>
  );
}

export default App;
