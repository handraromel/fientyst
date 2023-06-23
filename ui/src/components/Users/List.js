import BaseModal from "../Layout/Modal";
import {useEffect, useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";
import UserEdit from "./Edit";
import UserDetail from "./Detail";

const UsersList = () => {
  const {loading, processError, getUsers} = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const users = await getUsers();
      setUsers(users);
      setDataFetched(true);
      // console.log(users);
    };

    if (!dataFetched) {
      fetchUser();
    }
  }, [getUsers, dataFetched]);

  const handleTrigModal = (userId, modalType) => {
    setSelectedUserId(userId);

    if (modalType === "detail") {
      setShowDetailModal(true);
      setShowEditModal(false);
    } else if (modalType === "edit") {
      setShowDetailModal(false);
      setShowEditModal(true);
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-info text-center shadow-dark border-radius-lg pt-4 pb-3">
                <h6 className="text-white ps-3 text-uppercase letter-spacing-4">Registered Users</h6>
              </div>
            </div>
            <div className="card-body">
              {loading && <div className="text-center align-items-center">Loading your data, please wait...</div>}
              {processError && <div className="text-center align-items-center">{processError.message}</div>}
              {!loading && !processError && (
                <ul className="list-group">
                  {users.map((user) => (
                    <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg" key={user._id}>
                      <div className="d-flex flex-column">
                        <h6 className="mb-3 text-sm">{user.username}</h6>
                        <span className="mb-2 text-xs">
                          Full Name:
                          <span className="text-dark font-weight-bold ms-sm-2">
                            {user.first_name}&nbsp;{user.last_name}
                          </span>
                        </span>
                        <span className="mb-2 text-xs">
                          Email Address:
                          <span className="text-dark ms-sm-2 font-weight-bold">{user.email}</span>
                        </span>
                        <span className="text-xs mb-2">
                          Date Created:
                          <span className="text-dark ms-sm-2 font-weight-bold">{new Date(user.createdAt).toLocaleString()}</span>
                        </span>
                        <span className="text-xs">{user.is_admin && <strong className="text-info">Administrator</strong>}</span>
                      </div>
                      <div className="ms-auto text-end">
                        <button type="button" className="btn btn-link text-dark px-3 mb-0" data-bs-toggle="modal" data-bs-target="#userDetailModal" onClick={() => handleTrigModal(user._id, "detail")}>
                          <i className="material-icons text-sm me-2">reorder</i>Details
                        </button>
                        <button type="button" className="btn btn-link text-dark px-3 mb-0" data-bs-toggle="modal" data-bs-target="#userEditModal" onClick={() => handleTrigModal(user._id, "edit")}>
                          <i className="material-icons text-sm me-2">edit</i>Edit
                        </button>
                        <a className="btn btn-link text-danger text-gradient px-3 mb-0">
                          <i className="material-icons text-sm me-2">delete</i>
                          Delete
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <BaseModal showModal={showDetailModal} modalId="userDetailModal" modalContent={<UserDetail userId={selectedUserId} />} modalTitle="User's Detail" />
      <BaseModal showModal={showEditModal} modalId="userEditModal" modalContent={<UserEdit userId={selectedUserId} />} modalTitle="Edit User's Data" />
    </>
  );
};

export default UsersList;
