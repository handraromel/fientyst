import {useEffect, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import Routes from "../../routes/index";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  const {isAuthenticated, user} = useContext(AuthContext);
  const routes = Routes(isAuthenticated);

  useEffect(() => {
    // Material Design Input function
    var inputs = document.querySelectorAll("input");

    for (var n = 0; n < inputs.length; n++) {
      inputs[n].addEventListener(
        "focus",
        function (e) {
          this.parentElement.classList.add("is-focused");
        },
        false
      );

      inputs[n].onkeyup = function (e) {
        if (this.value !== "") {
          this.parentElement.classList.add("is-filled");
        } else {
          this.parentElement.classList.remove("is-filled");
        }
      };

      inputs[n].addEventListener(
        "focusout",
        function (e) {
          if (this.value !== "") {
            this.parentElement.classList.add("is-filled");
          }
          this.parentElement.classList.remove("is-focused");
        },
        false
      );
    }

    // Ripple Effect
    var ripples = document.querySelectorAll(".btn");

    for (var i = 0; i < ripples.length; i++) {
      ripples[i].addEventListener(
        "click",
        function (e) {
          var targetEl = e.target;
          var rippleDiv = targetEl.querySelector(".ripple");

          rippleDiv = document.createElement("span");
          rippleDiv.classList.add("ripple");
          rippleDiv.style.width = rippleDiv.style.height = Math.max(targetEl.offsetWidth, targetEl.offsetHeight) + "px";
          targetEl.appendChild(rippleDiv);

          rippleDiv.style.left = e.offsetX - rippleDiv.offsetWidth / 2 + "px";
          rippleDiv.style.top = e.offsetY - rippleDiv.offsetHeight / 2 + "px";
          rippleDiv.classList.add("ripple");
          setTimeout(function () {
            rippleDiv.parentElement.removeChild(rippleDiv);
          }, 600);
        },
        false
      );
    }
  });

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
