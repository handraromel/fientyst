import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import useToast from "../../hooks/useToast";
import validate from "../../services/validation";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const loginAttempt = async (data) => {
    try {
      setLoading(true);
      const error = await login(data.email, data.password);
      if (error) {
        showToast("Invalid login credentials.", "error");
      } else {
        showToast("Logged in successfully!", "success");
      }
    } catch (error) {
      showToast("An error occurred while logging in.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header align-items-start min-vh-90">
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                      Sign in
                    </h4>
                  </div>
                </div>
                <div className="card-body">
                  <form
                    role="form"
                    className="text-start"
                    onSubmit={handleSubmit(loginAttempt)}
                    autoComplete="off"
                  >
                    <div
                      className={`input-group input-group-outline my-2 ${
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
                      className={`input-group input-group-outline my-2 ${
                        errors.password ? "is-invalid is-filled" : null
                      }`}
                    >
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        {...register("password", {
                          required: "Please enter your password",
                        })}
                      />
                      <small className="text-danger w-100 my-1">
                        {errors.password?.message}
                      </small>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn bg-gradient-primary w-100 my-4 mb-2"
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
    </>
  );
};

export default Login;
