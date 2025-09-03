import React, { useState, Suspense, lazy } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { PageLoader, ModalLoader } from "./components/CustomLoader/CustomLoader.jsx";
const Home = lazy(() => import("./pages/Home/Home"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder/PlaceOrder"));
const LoginPopUp = lazy(() => import("./components/LogInPopUp/LoginPopUp"));

const App = () => {
  const [showLoginPopUp, setShowLoginPopUp] = useState(false);

  return (
    <>
      {showLoginPopUp && (
        <Suspense fallback={<ModalLoader message="Loading login form..." />}>
          <LoginPopUp setShowLoginPopUp={setShowLoginPopUp} />
        </Suspense>
      )}
      <div className="app">
        <Navbar setShowLoginPopUp={setShowLoginPopUp} />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
          </Routes>
        </Suspense>
      </div>
      
      <Footer />
    </>
  );
};

export default App;