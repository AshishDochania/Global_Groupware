import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UsersList from "./components/UsersList";
import { isAuthenticated } from "./utils/auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/users"
        element={isAuthenticated() ? <UsersList /> : <Navigate to="/" />}
      />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
