import React, { useEffect } from "react";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import DetailPage from "./Pages/DetailPage";
import ShopPage from "./Pages/ShopPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HistoryPage from "./Pages/HistoryPage";
import OrderDetailPage from "./Pages/OrderDetailPage";
import Layout from "./component/Layout/Layout";
import { useDispatch } from "react-redux";
import { authActions } from "./store/authSlice";
import useHttp from "./hooks/useHttp";
import { serverUrl } from "./utils/constant";
import ProfilePage from "./Pages/ProfilePage";
function App() {
  const dispatch = useDispatch();
  // Logout when user close browser
  const { sendRequest } = useHttp();
  useEffect(() => {
    sendRequest({ url: `${serverUrl}/authenticated` }, (data) => {
      console.log(data);
      if (data.isLoggedIn !== true) {
        dispatch(authActions.logout());
      }
    });
  }, []);
  return (
    <React.Fragment>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/order/:id" element={<OrderDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
