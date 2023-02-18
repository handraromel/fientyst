import { useState } from "react";
import { Link } from "react-router-dom";

const NavLink = ({ href, title, isActive, setActive }) => (
  <Link
    to={href}
    className={`nav-link text-white ${isActive ? "active bg-gradient-primary" : ""}`}
    onClick={() => setActive(title)}
  >
    {title}
  </Link>
);

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [isClassAdded, setIsClassAdded] = useState(true);
  const sidenavShow = document.getElementsByClassName("g-sidenav-show")[0];
  const iconSidenav = document.getElementById("iconSidenav");

  const toggleSidebar = () => {
    setIsClassAdded(() => {
      if (isClassAdded) {
        sidenavShow.classList.remove("g-sidenav-pinned");
        sidenavShow.classList.add("g-sidenav-hidden");
        iconSidenav.classList.add("d-none");
      }
      return isClassAdded;
    });
  };

  return (
    <>
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
            onClick={toggleSidebar}
          ></i>
          <a className="navbar-brand m-0" href={void 0} target="_blank">
            <img
              src="../assets/img/logo-ct.png"
              className="navbar-brand-img h-100"
              alt="main_logo"
            />
            <span className="ms-1 font-weight-bold text-white">
              fientyst App
            </span>
          </a>
        </div>
        <hr className="horizontal light mt-0 mb-2" />
        <div
          className="collapse navbar-collapse  w-auto "
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                href="/"
                title="dashboard"
                isActive={activeLink === "dashboard"}
                setActive={setActiveLink}
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">dashboard</i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                href="/"
                title="tables"
                isActive={activeLink === "tables"}
                setActive={setActiveLink}
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">table_view</i>
                </div>
                <span className="nav-link-text ms-1">Tables</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                href="/"
                title="billing"
                isActive={activeLink === "billing"}
                setActive={setActiveLink}
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">receipt_long</i>
                </div>
                <span className="nav-link-text ms-1">Billing</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                href="/"
                title="vr"
                isActive={activeLink === "vr"}
                setActive={setActiveLink}
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">view_in_ar</i>
                </div>
                <span className="nav-link-text ms-1">Virtual Reality</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                href="/"
                title="rtl"
                isActive={activeLink === "rtl"}
                setActive={setActiveLink}
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">
                    format_textdirection_r_to_l
                  </i>
                </div>
                <span className="nav-link-text ms-1">RTL</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                href="/"
                title="notification"
                isActive={activeLink === "notification"}
                setActive={setActiveLink}
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">notifications</i>
                </div>
                <span className="nav-link-text ms-1">Notifications</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidenav-footer position-absolute w-100 bottom-0 ">
          <div className="mx-3">
            <a
              className="btn bg-gradient-primary mt-4 w-100"
              href="#"
              type="button"
            >
              Annissa - Handra
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
