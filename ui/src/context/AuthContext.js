import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import api from "../services/api";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
});

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      console.log(decoded.exp);
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
       localStorage.setItem("token", response.data.token);
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
       localStorage.setItem("token", response.data.token);
       setIsAuthenticated(true);
       setUser(jwt_decode(response.data.token));
     } catch (error) {
       console.log(error.response.data);
       return error.response.data;
     }
   };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
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
