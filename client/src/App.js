import "./App.css";
import Navigation from "./customer/components/navigation/Navigation";
import Product from "./customer/components/product/Product";
import HomePage from "./customer/pages/homePage/HomePage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div>
        {/* <HomePage /> */}
        <Product />
      </div>
    </div>
  );
}

export default App;
