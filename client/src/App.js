import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PageNotFound from "./pages/PageNotFound";
import ContactPage from "./pages/ContactPage";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoutes from "./components/Routes/PrivateRoutes";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoutes from "./components/Routes/AdminRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="user" element={<Dashboard />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoutes/>}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
