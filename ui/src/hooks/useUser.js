import { useCallback, useState } from "react";
import api from "../services/api";

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/users");
      setUsers(response.data);
      console.log(response.data)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    users,
    getUsers,
  };
};

export default useUser;
