import './App.css';
import Footer from './customer/components/footer/Footer'
import CheckOut from './customer/components/checkOut/CheckOut';
import Cart from './customer/components/cart/Cart';
import Navigation from './customer/components/navigation/Navigation';

import HomePage from './customer/pages/homePage/HomePage';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <div>
          {/* <HomePage /> */}
          <CheckOut />
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
