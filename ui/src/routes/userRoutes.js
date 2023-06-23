import {Navigate} from "react-router-dom";
import UserIndex from "../components/Users/Index";

const userRoutes = (isAuthenticated) => {
  return [
    {
      path: "/users",
      element: isAuthenticated ? <UserIndex /> : <Navigate to="/login" />,
    },
  ];
};

export default userRoutes;
