import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import useToast from "../../hooks/useToast";
import validate from "../../services/validation";
import UserList from "../Users/List";

const Register = () => {
  const { signup } = useContext(AuthContext);
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const registerAttempt = async (data) => {
    try {
      setLoading(true);
      const error = await signup(
        data.username,
        data.password,
        data.email,
        data.first_name,
        data.last_name
      );
      if (error) {
        showToast(error.msg, "error");
      } else {
        showToast("User registered successfully!", "success");
        reset();
      }
    } catch (error) {
      showToast("An error occurred while registering", "error");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleNumberOnly = (event) => {
    if (
      (event.which !== 8 && event.which !== 0 && event.which < 48) ||
      event.which > 57
    ) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      // remove "is-filled" class from all input groups
      const inputGroups = document.querySelectorAll(".input-group");
      inputGroups.forEach((group) => {
        group.classList.remove("is-filled");
      });
    }
  }, [errors]);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary text-center shadow-dark border-radius-lg pt-4 pb-3">
                <h6 className="text-white ps-3 text-uppercase letter-spacing-4">
                  Register new user
                </h6>
              </div>
            </div>
            <div className="card-body">
              <form
                role="form"
                className="text-start"
                onSubmit={handleSubmit(registerAttempt)}
                autoComplete="off"
              >
                <div
                  className={`input-group input-group-outline mb-3 mt-2 ${
                    errors.username ? "is-invalid is-filled" : null
                  }`}
                >
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("username", {
                      required: "An username is required",
                      minLength: {
                        value: 5,
                        message: "Username must be at least 5 characters long",
                      },
                    })}
                  />
                  <small className="text-danger w-100 my-1">
                    {errors.username?.message}
                  </small>
                </div>
                <div
                  className={`input-group input-group-outline mb-3 mt-2 ${
                    errors.email ? "is-invalid is-filled" : null
                  }`}
                >
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("email", {
                      required: "An email is required",
                      pattern: {
                        value: validate.email,
                        message: "The email format is not valid",
                      },
                    })}
                  />
                  <small className="text-danger w-100 my-1">
                    {errors.email?.message}
                  </small>
                </div>
                <div
                  className={`input-group input-group-outline mb-3 mt-2 ${
                    errors.password ? "is-invalid is-filled" : null
                  }`}
                >
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("password", {
                      required: "Enter your password",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                      pattern: {
                        value: validate.password,
                        message:
                          "The password must contain at least one number, one uppercase and lowercase",
                      },
                    })}
                  />
                  <small className="text-danger w-100 my-1">
                    {errors.password?.message}
                  </small>
                </div>
                <div
                  className={`input-group input-group-outline mb-3 mt-2 ${
                    errors.passwordConfirm ? "is-invalid is-filled" : null
                  }`}
                >
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("passwordConfirm", {
                      required: "Re-enter your current password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  <small className="text-danger w-100 my-1">
                    {errors.passwordConfirm?.message}
                  </small>
                </div>
                <div
                  className={`input-group input-group-outline mb-3 mt-2 ${
                    errors.first_name ? "is-invalid is-filled" : null
                  }`}
                >
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("first_name", {
                      required: "Enter your first name",
                    })}
                  />
                  <small className="text-danger w-100 my-1">
                    {errors.first_name?.message}
                  </small>
                </div>
                <div
                  className={`input-group input-group-outline mb-3 mt-2 ${
                    errors.last_name ? "is-invalid is-filled" : null
                  }`}
                >
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("last_name", {
                      required: "Enter your last name",
                    })}
                  />
                  <small className="text-danger w-100 my-1">
                    {errors.last_name?.message}
                  </small>
                </div>
                <div
                  className={`input-group input-group-outline mb-3 mt-2 ${
                    errors.phone_number ? "is-invalid is-filled" : null
                  }`}
                >
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("phone_number", {
                      required: "Enter a phone number",
                      maxLength: {
                        value: 13,
                        message:
                          "Phone number must not be more than 13 characters",
                      },
                      minLength: {
                        value: 11,
                        message:
                          "Phone number can not be less than 11 characters",
                      },
                      pattern: {
                        value: validate.phoneNumber,
                        message: "Invalid phone number format",
                      },
                    })}
                    onKeyDown={handleNumberOnly}
                  />
                  <small className="text-danger w-100 my-1">
                    {errors.phone_number?.message}
                  </small>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn bg-gradient-primary my-4 mb-2"
                    disabled={loading}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <UserList />
      </div>
    </>
  );
};

export default Register;
