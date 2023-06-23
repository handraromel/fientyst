import {useState} from "react";
import api from "../services/api";

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      setLoading(true);
      const response = await api.get("/users");
      const data = await response.data;
      setUsers(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/users/${userId}`);
      const data = response.data;
      return data;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    users,
    getUsers,
    getUserById,
  };
};

export default useUser;
