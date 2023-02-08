import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import api from "../services/api";

const initialAuthState = {
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext(initialAuthState);

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        logout();
      } else {
        setIsAuthenticated(true);
        setUser(decoded);
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      sessionStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setUser(jwt_decode(response.data.token));
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
      sessionStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setUser(jwt_decode(response.data.token));
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  console.log(isAuthenticated)

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, signup, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
