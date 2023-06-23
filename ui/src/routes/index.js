import { useRoutes } from "react-router-dom";
import AuthRoutes from "./authRoutes";
import UserRoutes from "./userRoutes";

const Routes = (isAuthenticated) => {
  const routes = useRoutes([
    ...AuthRoutes(isAuthenticated),
    ...UserRoutes(isAuthenticated),
  ]);
  return routes;
};

export default Routes;
