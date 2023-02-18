import UserList from "../components/Users/List";
import { Navigate } from "react-router-dom";

const userRoutes = (isAuthenticated) => {
  return [
    {
      path: "/users",
      element: isAuthenticated ? <UserList /> : <Navigate to="/login" />,
    },
  ];
};

export default userRoutes;
