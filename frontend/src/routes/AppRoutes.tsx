import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";



// Pages
import LoginPage from "../pages/auth/LoginPage";
import ManageMoviesPage from "../pages/admin/ManageMoviesPage";
import * as React from "react";
//import HomePage from "@/pages/customer/HomePage";
//import MovieDetailsPage from "@/pages/customer/MovieDetailsPage";
//import NotFoundPage from "@/pages/NotFoundPage";

// (Optional) wrappers for layout/auth
// import AdminLayout from "@/layouts/AdminLayout";
// import CustomerLayout from "@/layouts/CustomerLayout";
// import ProtectedRoute from "@/components/auth/ProtectedRoute"; // if you're using auth context

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/admin/movies" element={<ManageMoviesPage />} />

        {/* Customer */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
