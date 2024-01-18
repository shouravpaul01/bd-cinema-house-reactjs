import { Link } from "react-router-dom";
import { FaRebel } from "react-icons/fa6";
import { useState } from "react";
import SignInForm from "../../../components/CommonComponents/SignInForm";
import SignUpForm from "../../../components/CommonComponents/SignUpForm";


const SignInAndUp = () => {
    const [tabActive,setTabActive]=useState('signin')
    console.log(tabActive);
    return (
        <section className="my-container py-24 flex justify-center ">
            
            <div className="bg-white rounded-md w-full md:w-96 relative">
            {/* <div className="border-2 border-indigo-400 rounded-full p-10 absolute top-0 overflow-hidden">
                <FaRebel  className="text-5xl"/>
            </div> */}
                <div role="tablist" className="tabs  rounded-t-md">
                    <Link role="tab" className={`tab rounded-tl-lg ${tabActive==='signin'?'bg-indigo-500 text-white':'bg-slate-200'}`} onClick={()=>setTabActive('signin')}>Sign In</Link>
                    <Link role="tab" className={`tab rounded-tr-lg ${tabActive==='signup'?'bg-indigo-500 text-white':'bg-slate-200'}`}  onClick={()=>setTabActive('signup')}>Sign Up</Link>
                </div>
                <div className="px-4 py-5">
                {
                   tabActive=='signin' && <SignInForm/> 
                }
                 {
                 
                   tabActive=='signup' && <SignUpForm/>
               
                }
                </div>
               
                
            </div>

        </section>

    );
};

export default SignInAndUp;