import {createContext, useState} from "react";
import api from "../services/api";

const UserContext = createContext();

const UserContextProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [processError, setProcessError] = useState(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      const users = response.data;
      return users;
    } catch (error) {
      setProcessError(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (userId) => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${userId}`);
      const user = response.data;
      return user;
    } catch (error) {
      setProcessError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, userData) => {
    setLoading(true);
    try {
      const response = await api.patch(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      setProcessError(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStat = async (userId) => {
    setLoading(true);
    try {
      const response = await api.patch(`/users/${userId}/change-status`);
      return response.data;
    } catch (error) {
      setProcessError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  };

  return <UserContext.Provider value={{loading, processError, getUsers, getUserById, updateUser, toggleUserStat, deleteUser}}>{children}</UserContext.Provider>;
};

export {UserContext, UserContextProvider};
