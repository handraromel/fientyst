import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Routes from "../../routes/index";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = (props) => {
  const { isAuthenticated } = useContext(AuthContext);
  const routes = Routes(isAuthenticated);

  return (
    <>
      <Navbar />
      {routes}
      <Footer />
    </>
  );
};

export default Layout;
