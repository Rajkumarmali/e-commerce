import './App.css';
import Footer from './customer/components/footer/Footer'
import CheckOut from './customer/components/checkOut/CheckOut';
import Cart from './customer/components/cart/Cart';
import Navigation from './customer/components/navigation/Navigation';

import Order from './customer/components/order/Order';
import HomePage from './customer/pages/homePage/HomePage';
import { BrowserRouter } from "react-router-dom";
import OrderDetails from './customer/components/order/OrderDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <div>
          {/* <HomePage /> */}
          {/* <Order /> */}
          <OrderDetails />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
