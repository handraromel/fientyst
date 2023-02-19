import { useState } from "react";
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

  return {
    loading,
    error,
    users,
    getUsers,
  };
};

export default useUser;
