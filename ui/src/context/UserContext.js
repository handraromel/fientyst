import { createContext } from "react";
import useUser from "../hooks/useUser";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { loading, error, users, getUsers } = useUser();

  return (
    <UserContext.Provider value={{ loading, error, users, getUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
