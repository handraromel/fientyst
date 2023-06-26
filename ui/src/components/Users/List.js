import BaseModal from "../Layout/Modal";
import {useEffect, useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";
import UserEdit from "./Edit";
import UserDetail from "./Detail";
import useToast from "../../hooks/useToast";
import Swal from "sweetalert2";

const UsersList = () => {
  const {loading, processError, getUsers, toggleUserStat, deleteUser} = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const {showToast} = useToast();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const users = await getUsers();
      setUsers(users);
      setDataFetched(true);
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

  const handleToggleStat = async (userId) => {
    try {
      showToast("Changing user status, please wait...", "info");
      const updatedUser = await toggleUserStat(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === userId) {
            return {
              ...user,
              is_active: updatedUser.is_active,
            };
          }
          return user;
        })
      );
      showToast("User status is changed!", "success");
    } catch (error) {
      showToast(error, "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      try {
        const deleteResult = await deleteUser(userId);
        if (deleteResult) {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
          Swal.fire("Deleted!", "The user has been deleted.", "success");
          // Perform any necessary actions after successful deletion
        } else {
          Swal.fire("Error!", "Failed to delete the user.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", `Failed to delete the user: ${error.message}`, "error");
      }
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
                        <span className="text-xs">
                          {user.is_admin ? (
                            <strong className="text-info">Administrator</strong>
                          ) : (
                            <div className="form-check form-switch mt-3">
                              <input className="form-check-input" type="checkbox" checked={user.is_active} onChange={() => handleToggleStat(user._id)} />
                              <label className="form-check-label text-xs">
                                {user.is_active ? <strong className="text-info">User is active</strong> : <strong className="text-danger">User is not active</strong>}
                              </label>
                            </div>
                          )}
                        </span>
                      </div>
                      <div className="ms-auto text-end">
                        <button type="button" className="btn btn-link text-dark px-3 mb-0" data-bs-toggle="modal" data-bs-target="#userDetailModal" onClick={() => handleTrigModal(user._id, "detail")}>
                          <i className="material-icons text-sm me-2">reorder</i>Details
                        </button>
                        <button type="button" className="btn btn-link text-dark px-3 mb-0" data-bs-toggle="modal" data-bs-target="#userEditModal" onClick={() => handleTrigModal(user._id, "edit")}>
                          <i className="material-icons text-sm me-2">edit</i>Edit
                        </button>
                        {!user.is_admin && (
                          <button type="button" className="btn btn-link text-danger text-gradient px-3 mb-0" onClick={() => handleDeleteUser(user._id)}>
                            <i className="material-icons text-sm me-2">delete</i>
                            Delete
                          </button>
                        )}
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
