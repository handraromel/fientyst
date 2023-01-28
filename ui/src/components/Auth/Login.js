import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import useToast from "../../hooks/useToast";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { showToast } = useToast();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

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
      showToast("Invalid login credentials.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(loginAttempt)}>
      <input type="text" {...register("email", { required: true })} />
      <input type="password" {...register("password", { required: true })} />
      <button type="submit" disabled={loading}>
        Login
      </button>
    </form>
  );
};

export default Login;
