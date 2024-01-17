import { NavLink, Outlet } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import profilePic from "../assets/images/profile.jpg"
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {

    const handleLogout = () => {

    };

    return (

        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
                {/* Mobile navbar */}
                <div className="navbar bg-base-100  lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <p className=" text-xl  font-bold"><span className="text-green-500">BD</span>-Cinema House</p>
                    </div>
                </div>
                <div className="mx-2 md:mx-10 my-12">
                    {/* Page content here */}
                    <Outlet />
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu gap-1 p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <div className="flex flex-col items-center mt-8 border-b-2">

                        <img src={profilePic} alt="profile" className="outline outline-2 outline-indigo-400 outline-offset-2 rounded-full w-24 h-24" />

                        <p className="uppercase font-bold text-xl my-1">{'emon'}</p>
                        <button className="btn btn-sm btn-primary mb-3" onClick={() => handleLogout()}><FaArrowRightFromBracket /><span>Logout</span></button>


                    </div>
                    {/* Sidebar content here */}
                    <li><NavLink to={"/dashboard"} className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink></li>
                    <li><NavLink to={'/dashboard/movies'} className={({ isActive }) => isActive ? "active" : ""}>Movies</NavLink></li>
                    <li><NavLink to={'/dashboard/shows'} className={({ isActive }) => isActive ? "active" : ""}>Movie Shows</NavLink></li>
                </ul>

            </div>
        </div>
    )
};

export default AdminLayout;