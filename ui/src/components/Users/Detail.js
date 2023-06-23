import {useState, useEffect, useContext} from "react";
import {UserContext} from "../../context/UserContext";

const UserDetail = ({userId}) => {
  const {loading, processError, getUserById} = useContext(UserContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(userId);
      setUserData(user);
    };
    fetchUser();
  }, [getUserById, userId]);

  return (
    <>
      <div>
        {loading && <div className="text-center align-items-center">Loading your data, please wait...</div>}
        {processError && <div className="text-center align-items-center">{processError.message}</div>}
        {!loading && !processError && (
          <div>
            <ul className="list-group">
              <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                <strong className="text-dark">Username:</strong> &nbsp; {userData.username}
              </li>
              <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                <strong className="text-dark">Email:</strong> &nbsp; {userData.email}
              </li>
              <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                <strong className="text-dark">Full Name:</strong> &nbsp; {userData.first_name}&nbsp;{userData.last_name}
              </li>
              <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                <strong className="text-dark">Phone Number:</strong> &nbsp; {userData.phone_number}
              </li>
              <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                <strong className="text-dark">Created at</strong> &nbsp; {new Date(userData.createdAt).toLocaleString()}
              </li>
              <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                {userData.is_admin ? <strong className="text-info">Administrator</strong> : <strong className="text-danger">Not Admin</strong>}
              </li>
              <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                {userData.is_active ? <strong className="text-info">Active</strong> : <strong className="text-danger">Not Active</strong>}
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetail;
