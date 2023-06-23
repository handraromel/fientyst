import {UserContextProvider} from "../../context/UserContext";
import UsersList from "./List";

const UserIndex = () => {
    return (
    <UserContextProvider>
      <UsersList />
    </UserContextProvider>
  );
};

export default UserIndex;
