import React from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Dashboard from "../components/Dashboard";
import { Navigate } from "react-router-dom";

const authRoutes = (isAuthenticated) => {
  return [
    {
      path: "/login",
      element: !isAuthenticated ? (
        <Login />
      ) : (
        <Navigate replace to="/dashboard" />
      ),
    },
    {
      path: "/register",
      element: !isAuthenticated ? (
        <Register />
      ) : (
        <Navigate replace to="/login" />
      ),
    },
    {
      path: "/dashboard",
      element: isAuthenticated ? (
        <Dashboard />
      ) : (
        <Navigate replace to="/login" />
      ),
    },
  ];
};

export default authRoutes;
