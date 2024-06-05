import { Link, Navigate } from "react-router-dom";
import movieImg from "/movie.svg";
import { useState } from "react";
import SignInForm from "../../../components/CommonComponents/SignInForm";
import SignUpForm from "../../../components/CommonComponents/SignUpForm";
import useAuth from "../../../hooks/useAuth";

const SignInAndUpPage = () => {
  const [tabActive, setTabActive] = useState("signin");
  const { user } = useAuth();

  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className="my-container py-24 flex flex-col md:flex-row gap-6 md:gap-0 ">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="relative ">
            <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-dotted border-violet-800 rounded-full animate-spin p-4"></div>
            <img
              src={movieImg}
              className="w-14 md:w-16 absolute top-3 left-3 md:left-4 opacity-85"
              alt="ju-logo"
            />
          </div>
          <div className="bg-violet-800 rounded-full outline-1 outline-dashed outline-violet-800 outline-offset-2">
            <p className="font-bold text-2xl  bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-white px-6 py-2">
              BD-Cinema-House
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="bg-white rounded-md w-full md:w-96 ">
          <div role="tablist" className="tabs  rounded-t-md">
            <Link
              role="tab"
              className={`tab rounded-tl-lg ${
                tabActive === "signin"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200"
              }`}
              onClick={() => setTabActive("signin")}
            >
              Sign In
            </Link>
            <Link
              role="tab"
              className={`tab rounded-tr-lg ${
                tabActive === "signup"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200"
              }`}
              onClick={() => setTabActive("signup")}
            >
              Sign Up
            </Link>
          </div>
          <div className="px-4 py-5">
            {tabActive == "signin" && <SignInForm />}
            {tabActive == "signup" && <SignUpForm />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInAndUpPage;
