import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import useToast from "../../hooks/useToast";

const Register = () => {
  const { signup } = useContext(AuthContext);
  const { showToast } = useToast();
  const { register, handleSubmit } = useForm();
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
      showToast("Registration failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 class="text-white ps-3">Register new user</h6>
              </div>
            </div>
            <div class="card-body px-0 pb-2"></div>
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
