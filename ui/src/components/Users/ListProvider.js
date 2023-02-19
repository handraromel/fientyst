import UserList from "./List";
import { UserContextProvider } from "../../context/UserContext";

const UserListProvider = () => {
  return (
    <UserContextProvider>
      <UserList />
    </UserContextProvider>
  );
};

export default UserListProvider;
