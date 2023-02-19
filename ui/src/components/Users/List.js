import { useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const UserList = () => {
  const { loading, error, users, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="col-lg-6">
        <div className="card my-4">
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-info text-center shadow-dark border-radius-lg pt-4 pb-3">
              <h6 className="text-white ps-3 text-uppercase letter-spacing-4">
                Registered Users
              </h6>
            </div>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {users.map((user) => (
                <li
                  className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"
                  key={user._id}
                >
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
                      <span className="text-dark ms-sm-2 font-weight-bold">
                        {user.email}
                      </span>
                    </span>
                    <span className="text-xs">
                      Date Created:
                      <span className="text-dark ms-sm-2 font-weight-bold">
                        {new Date(user.createdAt).toLocaleString()}
                      </span>
                    </span>
                  </div>
                  <div className="ms-auto text-end">
                    <a className="btn btn-link text-dark px-3 mb-0" href="#">
                      <i className="material-icons text-sm me-2">reorder</i>
                      Details
                    </a>
                    <a className="btn btn-link text-dark px-3 mb-0" href="#">
                      <i className="material-icons text-sm me-2">edit</i>Edit
                    </a>
                    <a
                      className="btn btn-link text-danger text-gradient px-3 mb-0"
                      href="#"
                    >
                      <i className="material-icons text-sm me-2">delete</i>
                      Delete
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
