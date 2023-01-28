import { useRoutes } from "react-router-dom";
import authRoutes from "./authRoutes";

const Routes = (isAuthenticated) => {
  const routes = useRoutes(authRoutes(isAuthenticated));
  return routes;
};

export default Routes;
