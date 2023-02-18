import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Dashboard from "../components/Dashboard";
import { Navigate } from "react-router-dom";

const authRoutes = (isAuthenticated) => {
  return [
    {
      path: "/",
      element: !isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <Navigate to="/dashboard" />
      ),
    },
    {
      path: "/login",
      element: !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />,
    },
    {
      path: "/register",
      element: isAuthenticated ? <Register /> : <Navigate to="/login" />,
    },
    {
      path: "/dashboard",
      element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
    },
  ];
};

export default authRoutes;
