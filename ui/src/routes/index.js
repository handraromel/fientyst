import { useRoutes } from "react-router-dom";
import AuthRoutes from "./authRoutes";

const Routes = (isAuthenticated) => {
  const routes = useRoutes(AuthRoutes(isAuthenticated));
  return routes;
};

export default Routes;
