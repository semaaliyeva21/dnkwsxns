import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShoppingCartProvider } from "../services/Context";
import Navbar from "../components/Navbar";
import Categories from "../pages/Categories";
import ShoppingCart from "../pages/ShoppingCart";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Router>
      <ShoppingCartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
        </Routes>
      </ShoppingCartProvider>
    </Router>
  );
};

export default AppRoutes;
