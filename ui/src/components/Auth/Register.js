import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import useToast from "../../hooks/useToast";
import validate from "../../services/validation";

const Register = () => {
  const { signup } = useContext(AuthContext);
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
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
      }
    } catch (error) {
      showToast("An error occurred while registering", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary text-center shadow-dark border-radius-lg pt-4 pb-3">
                <h6 className="text-white ps-3 text-uppercase letter-spacing-4">
                  Register new user
                </h6>
              </div>
            </div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-md-6 mt-4">
                  <form
                    role="form"
                    className="text-start"
                    onSubmit={handleSubmit(registerAttempt)}
                  >
                    <small className="text-danger">
                      {errors.username?.message}
                    </small>
                    <div className="input-group input-group-outline mb-3 mt-1">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("username", {
                          required: "A username is required",
                          minLength: {
                            value: 5,
                            message:
                              "Username must be at least 5 characters long",
                          },
                        })}
                      />
                    </div>
                    <small className="text-danger">
                      {errors.password?.message}
                    </small>
                    <div className="input-group input-group-outline mb-3 mt-1">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        {...register("password", {
                          required: "Please enter your password",
                        })}
                      />
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
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit(registerAttempt)}>
      <input type="text" {...register("username", { required: true })} />
      <input type="password" {...register("password", { required: true })} />
      <input type="text" {...register("email", { required: true })} />
      <input type="text" {...register("first_name", { required: true })} />
      <input type="text" {...register("last_name", { required: true })} />
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form> */}
    </>
  );
};

export default Register;
