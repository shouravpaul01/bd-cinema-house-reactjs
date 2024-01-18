import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SignUpForm = () => {
    const [showPassword,setShowPassword]=useState(false)
    return (
        <div>
            <p className="text-lg font-bold text-indigo-400 text-center border-b">Sign Up</p>
            <form >
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Full Name</span>
                    </div>
                    <input type="text" placeholder="Name" className="input input-sm input-bordered w-full " />
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type="text" placeholder="Email" className="input input-sm input-bordered w-full " />
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <div className="flex input input-sm input-bordered w-full ">
                    <input type={`${showPassword?"text":"password"}`} placeholder=" Password" className="flex-grow" />
                         <Link className="flex items-center" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<FaRegEye />:<FaRegEyeSlash />}</Link>
                    </div>
                    
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Confirm Password</span>
                    </div>
                    <div className="flex input input-sm input-bordered w-full ">
                    <input type={`${showPassword?"text":"password"}`} placeholder="Confirm Password" className="flex-grow" />
                         <Link className="flex items-center" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<FaRegEye />:<FaRegEyeSlash />}</Link>
                    </div>
                    
                </label>
                <button type="submit" className="btn btn-sm btn-primary mt-3">Sing in</button>
            </form>
        </div>
    );
};

export default SignUpForm;