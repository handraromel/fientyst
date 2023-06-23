import {useState, useEffect, useContext} from "react";
import {UserContext} from "../../context/UserContext";
import {useForm} from "react-hook-form";
import useToast from "../../hooks/useToast";
import validate from "../../services/validation";

const UserEdit = ({userId}) => {
  const {loading, processError, getUserById, updateUser} = useContext(UserContext);
  const {showToast} = useToast();
  const [initialUserData, setInitialUserData] = useState({});
  const [formReset, setFormReset] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {...initialUserData},
  });

  const initialFormState = {
    password: "",
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(userId);
      setInitialUserData(user);
      reset({...user, ...initialFormState});
      setFormReset(false);
    };
    fetchUser();
  }, [getUserById, userId, reset, formReset]);

  const handleFormReset = () => {
    reset(initialUserData);
    setFormReset(true);
  };

  const handleNumberOnly = (event) => {
    if ((event.which !== 8 && event.which !== 0 && event.which < 48) || event.which > 57) {
      event.preventDefault();
    }
  };

  const updateSubmit = async (data) => {
    if (processError) {
      showToast(processError, "error");
    } else {
      await updateUser(userId, data);
      showToast("User data updated successfully", "success");
    }
  };

  return (
    <div className="row justify-content-center">
      <form role="form" className="text-start" autoComplete="off" onSubmit={handleSubmit(updateSubmit)}>
        <div className={`input-group input-group-outline mb-3 mt-2 ${errors.username || formReset ? "is-invalid is-filled" : "is-filled"}`}>
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
          <small className="text-danger w-100 my-1">{errors.username?.message}</small>
        </div>
        <div className={`input-group input-group-outline mb-3 mt-2 ${errors.email || formReset ? "is-invalid is-filled" : "is-filled"}`}>
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
          <small className="text-danger w-100 my-1">{errors.email?.message}</small>
        </div>
        <div className={`input-group input-group-outline mb-3 mt-2 ${errors.first_name || formReset ? "is-invalid is-filled" : "is-filled"}`}>
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            {...register("first_name", {
              required: "Enter your first name",
            })}
          />
          <small className="text-danger w-100 my-1">{errors.first_name?.message}</small>
        </div>
        <div className={`input-group input-group-outline mb-3 mt-2 ${errors.last_name || formReset ? "is-invalid is-filled" : "is-filled"}`}>
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            {...register("last_name", {
              required: "Enter your last name",
            })}
          />
          <small className="text-danger w-100 my-1">{errors.last_name?.message}</small>
        </div>
        <div className={`input-group input-group-outline mb-3 mt-2 ${errors.phone_number || formReset ? "is-invalid is-filled" : "is-filled"}`}>
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            {...register("phone_number", {
              required: "Enter a phone number",
              maxLength: {
                value: 13,
                message: "Phone number must not be more than 13 characters",
              },
              minLength: {
                value: 11,
                message: "Phone number can not be less than 11 characters",
              },
              pattern: {
                value: validate.phoneNumber,
                message: "Invalid phone number format",
              },
            })}
            onKeyDown={handleNumberOnly}
          />
          <small className="text-danger w-100 my-1">{errors.phone_number?.message}</small>
        </div>
        <div className={`input-group input-group-outline mb-3 mt-2 ${errors.password ? "is-invalid is-filled" : "is-filled"}`}>
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
                message: "The password must contain at least one number, one uppercase and lowercase",
              },
            })}
          />
          <small className="text-danger w-100 my-1">{errors.password?.message}</small>
        </div>
        <div className={`input-group input-group-outline mb-3 mt-2 ${errors.passwordConfirm ? "is-invalid is-filled" : "is-filled"}`}>
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            {...register("passwordConfirm", {
              required: "Re-enter your current password",
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
          />
          <small className="text-danger w-100 my-1">{errors.passwordConfirm?.message}</small>
        </div>
        <button type="button" className="btn btn-sm bg-gradient-info" onClick={handleFormReset}>
          <small>Reset Form</small>
        </button>
        <div className="text-center">
          <button type="submit" className="btn bg-gradient-primary my-4 mb-2" disabled={loading}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
