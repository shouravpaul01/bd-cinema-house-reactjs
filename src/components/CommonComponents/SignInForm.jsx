import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";


const SignInForm = () => {
    const { register, handleSubmit, reset, control, watch, setValue, setError, formState: { errors } } = useForm()
    const [showPassword,setShowPassword]=useState(false)
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const currentLocation = location?.state?.from?.pathname || '/'
    
    const handleSignIn = (data) => {
        signIn(data.email,data.password)
        .then(()=>{
           navigate(currentLocation,{replace:true})
           toast.success('Successfully Sign in.')
           reset()
        })
        .catch((err) => {
            console.log(err.message);
          });
    }

    return (
        <div>
            <p className="text-lg font-bold text-indigo-400 text-center border-b">Sign In</p>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type="text" {...register('email', { required: "The field is required" })} placeholder="Email" className="input input-sm input-bordered w-full " />
                    {errors?.email && <p className="text-red-400">{errors.email.message}</p>}
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <div className="flex input input-sm input-bordered w-full ">
                    <input type={`${showPassword?"text":"password"}`} {...register('password', { required: "The field is required" })} placeholder=" Password" className="flex-grow" />
                         <Link className="flex items-center" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<FaRegEye />:<FaRegEyeSlash />}</Link>
                    </div>
                    {errors?.password && <p className="text-red-400">{errors.password.message}</p>}
                </label>
                <button type="submit" className="btn btn-sm btn-primary mt-3">Sing in</button>
            </form>
        </div>
    );
};

export default SignInForm;