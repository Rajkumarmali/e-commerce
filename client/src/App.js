import "./App.css";
import Navigation from "./customer/components/navigation/Navigation";
import Product from "./customer/components/product/Product";
import ProductDetails from "./customer/components/productDetails/ProductDetails";
import HomePage from "./customer/pages/homePage/HomePage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div>
        {/* <HomePage /> */}
        {/* <Product /> */}
        <ProductDetails />
      </div>
    </div>
  );
}

export default App;
