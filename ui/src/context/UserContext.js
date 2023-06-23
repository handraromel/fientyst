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
      const updatedUser = response.data;
      return updatedUser;
    } catch (error) {
      setProcessError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      // Return true or perform any necessary actions after deletion
      return true;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  };

  return <UserContext.Provider value={{loading, processError, getUsers, getUserById, updateUser, deleteUser}}>{children}</UserContext.Provider>;
};

export {UserContext, UserContextProvider};
