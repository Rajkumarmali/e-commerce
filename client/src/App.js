import './App.css';
import Footer from './customer/components/footer/Footer'
import Cart from './customer/components/cart/Cart';
import Navigation from './customer/components/navigation/Navigation';

import HomePage from './customer/pages/homePage/HomePage';


function App() {
  return (
    <div className="App">
      <Navigation />
      <div>
        {/* <HomePage /> */}
        <Cart />
      </div>
      <Footer />
    </div>
  );
}

export default App;
