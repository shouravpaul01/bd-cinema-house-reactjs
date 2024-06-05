import { useState } from "react";
import { useForm } from "react-hook-form";
<<<<<<< HEAD
import {
  FaArrowRightToBracket,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa6";
=======
import { FaArrowRightToBracket, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import axiosInstance from "../../../axiosConfig";
import { toast } from "react-toastify";

const SignUpForm = () => {
<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location?.state?.from?.pathname || "/";

  const handleSignUp = (data) => {
    axiosInstance
      .post("/users/create-user", data)
      .then((res) => {
        if (res.status == 200) {
          signUp(data.email, data.password).then(() => {
            // navigate("/signin", { replace: true });
            toast.success(res.data.message);
            reset();
          });
        }
      })
      .catch((err) => {
        if (err?.response.status == 400) {
          err?.response.data?.errorSources?.map((element) => {
            setError(element.path, {
              type: "manual",
              message: element.message,
            });
          });
        }
        console.log(err.message);
      });
  };
  return (
    <div>
      <p className="text-lg font-bold text-indigo-400 text-center border-b">
        Sign Up
      </p>
      {authError && <p className="text-red-400">{authError}</p>}
      <form onSubmit={handleSubmit(handleSignUp)}>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Full Name</span>
          </div>
          <input
            type="text"
            {...register("name", { required: "The field is required" })}
            placeholder="Name"
            className="input input-sm input-bordered w-full "
          />
          {errors?.name && (
            <p className="text-red-400">{errors.name.message}</p>
          )}
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            {...register("email", { required: "The field is required" })}
            placeholder="Email"
            className="input input-sm input-bordered w-full "
          />
          {errors?.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <div className="flex input input-sm input-bordered w-full ">
            <input
              type={`${showPassword ? "text" : "password"}`}
              {...register("password", { required: "The field is required" })}
              placeholder=" Password"
              className="flex-grow"
            />
            <Link
              className="flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </Link>
          </div>
          {errors?.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <div className="flex input input-sm input-bordered w-full ">
            <input
              type={`${showPassword ? "text" : "password"}`}
              {...register("confirmPassword", {
                required: "The field is required",
                validate: (value) =>
                  value == watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm Password"
              className="flex-grow"
            />
            <Link
              className="flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </Link>
          </div>
          {errors?.confirmPassword && (
            <p className="text-red-400">{errors.confirmPassword.message}</p>
          )}
        </label>
        <button
          type="submit"
          className="btn btn-sm btn-primary rounded-full px-7 mt-3"
        >
          <FaArrowRightToBracket />
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
=======
    const [showPassword, setShowPassword] = useState(false)
    const [authError, setAuthError] = useState(null)
    const { register, handleSubmit, reset, control, watch, setValue, setError, formState: { errors } } = useForm()
    const { signUp } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const currentLocation = location?.state?.from?.pathname || '/'

    const handleSignUp = (data) => {
        signUp(data.email,data.password)
        .then(()=>{
            axiosInstance.post('/user',data)
            .then(res=>{
                console.log(res);
                if (res.data.code === 204) {
                    const validation = res.data.validationErrors
                    validation.map(element => {
                        setError(element.field, {
                            type: 'manual',
                            message: element.message,
                        })
                    })
                }
                if (res.data.code == 200) {
                    navigate('/signin',{replace:true})
                    toast.success(res.data.message)
                    reset()
                }
            })
        })
        .catch((err) => {
            if (err.message=='Firebase: Error (auth/email-already-in-use).') {
                setAuthError('Email already exist.')
            }
            console.log(err.message,'dd');
          });
    }
    return (
        <div>
            <p className="text-lg font-bold text-indigo-400 text-center border-b">Sign Up</p>
            {
                authError && <p className="text-red-400">{authError}</p>
            }
            <form onSubmit={handleSubmit(handleSignUp)}>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Full Name</span>
                    </div>
                    <input type="text" {...register('name', { required: "The field is required" })} placeholder="Name" className="input input-sm input-bordered w-full " />
                    {errors?.name && <p className="text-red-400">{errors.name.message}</p>}
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type="email" {...register('email', { required: "The field is required" })} placeholder="Email" className="input input-sm input-bordered w-full " />
                    {errors?.email && <p className="text-red-400">{errors.email.message}</p>}
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <div className="flex input input-sm input-bordered w-full ">
                        <input type={`${showPassword ? "text" : "password"}`} {...register('password', { required: "The field is required" })} placeholder=" Password" className="flex-grow" />
                        <Link className="flex items-center" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</Link>
                    </div>
                    {errors?.password && <p className="text-red-400">{errors.password.message}</p>}
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Confirm Password</span>
                    </div>
                    <div className="flex input input-sm input-bordered w-full ">
                        <input type={`${showPassword ? "text" : "password"}`} {...register('confirmPassword', { required: "The field is required", validate: value => value == watch('password') || 'Passwords do not match' })} placeholder="Confirm Password" className="flex-grow" />
                        <Link className="flex items-center" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</Link>
                    </div>
                    {errors?.confirmPassword && <p className="text-red-400">{errors.confirmPassword.message}</p>}
                </label>
                <button type="submit" className="btn btn-sm btn-primary mt-3"><FaArrowRightToBracket />Sing in</button>
            </form>
        </div>
    );
};

export default SignUpForm;
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
