import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import api from "../services/api";

const initialAuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user: null,
};

const checkTokenExpiration = (decoded) => {
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    return false;
  }
  return true;
};

export const AuthContext = createContext(initialAuthState);

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialAuthState.isAuthenticated
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      if (checkTokenExpiration(decoded)) {
        setUser(decoded);
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", true);
      } else {
        logout();
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const decoded = jwt_decode(response.data.token);
      sessionStorage.setItem("token", response.data.token);
      setUser(decoded);
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", true);
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  };

  const signup = async (username, password, email, first_name, last_name) => {
    try {
      const response = await api.post("/auth/register", {
        username,
        password,
        email,
        first_name,
        last_name,
      });
      const decoded = jwt_decode(response.data.token);
      sessionStorage.setItem("token", response.data.token);
      setUser(decoded);
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", true);
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    localStorage.setItem("isAuthenticated", false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, signup, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
