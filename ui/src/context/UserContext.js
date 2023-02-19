import { createContext, useContext } from "react";
import useUser from "../hooks/useUser";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const { loading, error, users, getUsers } = useUser();

  return (
    <UserContext.Provider value={{ loading, error, users, getUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
