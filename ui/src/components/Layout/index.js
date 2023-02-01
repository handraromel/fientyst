import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Routes from "../../routes/index";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  const { isAuthenticated } = useContext(AuthContext);
  const routes = Routes(isAuthenticated);

  return (
    <>
      {isAuthenticated ? <Sidebar /> : null}
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        {isAuthenticated ? <Navbar /> : null}
        <div className="container-fluid py-4">
          {routes}
          {isAuthenticated ? <Footer /> : null}
        </div>
      </main>
    </>
  );
};

export default Layout;
