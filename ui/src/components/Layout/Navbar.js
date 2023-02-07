import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import useToast from "../../hooks/useToast";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [isClassAdded, setIsClassAdded] = useState(true);
  const [isSticky, setSticky] = useState("shadow-none");
  const [background, setBackground] = useState("");
  const sidenavShow = document.getElementsByClassName("g-sidenav-show")[0];
  const iconSidenav = document.getElementById("iconSidenav");
  const { showToast } = useToast();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    if (window.pageYOffset > 50) {
      setSticky("sticky-top");
      setBackground("bg-gradient-dark shadow-dark top-1");
    } else {
      setSticky("shadow-none");
      setBackground("");
    }
  };

  const toggleSidebar = () => {
    setIsClassAdded(() => {
      if (isClassAdded) {
        sidenavShow.classList.remove("g-sidenav-hidden");
        sidenavShow.classList.add("g-sidenav-pinned");
        iconSidenav.classList.remove("d-none");
      } else {
        sidenavShow.classList.remove("g-sidenav-pinned");
        sidenavShow.classList.add("g-sidenav-hidden");
        iconSidenav.classList.add("d-none");
      }
      return !isClassAdded;
    });
  };

  const attemptLogout = () => {
    logout();
    if (logout) {
      showToast("Successfully logged out", "success");
    }
  };

  return (
    <>
      <nav
        className={`navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl ${background} ${isSticky}`}
        id="navbarBlur"
        data-scroll="true"
      >
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <h5 className="font-weight-bolder text-white mb-0">Dashboard</h5>
          </nav>
          <div
            className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
            id="navbar"
          >
            <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item d-xl-none px-3 d-flex align-items-center">
                <a
                  href={void 0}
                  className="nav-link text-body p-0"
                  id="iconNavbarSidenav"
                  onClick={toggleSidebar}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                  </div>
                </a>
              </li>
              <li className="nav-item dropdown d-flex align-items-center">
                <a
                  href={void 0}
                  className="font-weight-bold cursor-pointer btn btn-primary text-white mb-0"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-user me-sm-1"></i>
                  <span className="d-sm-inline d-none">User's Menu</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="mb-2">
                    <a className="dropdown-item border-radius-md" href="#">
                      <div className="d-flex py-1">
                        <div className="my-auto">
                          <img
                            src="../assets/img/team-2.jpg"
                            className="avatar avatar-sm me-3 "
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="text-sm font-weight-normal mb-1">
                            <span className="font-weight-bold">
                              Profile detail
                            </span>
                          </h6>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="dropdown-item border-radius-md"
                      to="/register"
                    >
                      <div className="d-flex py-1">
                        <div className="my-auto">
                          <img
                            src="../assets/img/small-logos/logo-spotify.svg"
                            className="avatar avatar-sm bg-gradient-dark me-3 "
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="text-sm font-weight-normal mb-1">
                            <span className="font-weight-bold">
                              Register new user
                            </span>
                          </h6>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <a
                      className="dropdown-item border-radius-md"
                      href={void 0}
                      onClick={attemptLogout}
                    >
                      <div className="d-flex py-1">
                        <div className="my-auto">
                          <img
                            src="../assets/img/small-logos/logo-spotify.svg"
                            className="avatar avatar-sm bg-gradient-dark me-3 "
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="text-sm font-weight-normal mb-1">
                            <span className="font-weight-bold">Logout</span>
                          </h6>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
