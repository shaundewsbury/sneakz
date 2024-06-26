import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import { BasketProvider } from "./context/BasketContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import AllProducts from "./pages/galleries/AllProducts";
import Product from "./pages/Product";
import Department from "./pages/galleries/Department";
import Content from "./components/layout/Content";
import Basket from "./pages/Basket";
import SavedProducts from "./pages/SavedProducts";

function App() {
  return (
    <>
      <AuthContextProvider>
        <BasketProvider>
          <Navbar />
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<Account />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/product/:productID" element={<Product />} />
              <Route path="/saved-products" element={<SavedProducts />} />
              <Route
                path="/department/:departmentID"
                element={<Department />}
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </Content>
        </BasketProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
