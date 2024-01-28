import { NavLink, Outlet } from "react-router-dom";
import { FaArrowRightFromBracket, FaBars } from "react-icons/fa6";
// import profilePic from "../assets/images/profile.jpg"
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {

    const handleLogout = () => {

    };

    return (

        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                <div className="navbar my-container bg-violet-900   shadow-lg outline-dashed outline-1 outline-offset-2 outline-violet-900 rounded-b-3xl sticky top-0 z-10 lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button">
                        <FaBars className="text-white animate-bounce" />
                        </label>
                    </div>
                    <div className="flex-1">
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-white">BD-Cinema House</p>
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

                <ul className="menu-item gap-1 p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <div className="flex flex-col items-center mt-8 border-b-2">

                        <img src={''} alt="profile" className="outline outline-2 outline-indigo-400 outline-offset-2 rounded-full w-24 h-24" />

                        <p className="uppercase font-bold text-xl my-1">{'emon'}</p>
                        <button className="btn btn-sm btn-primary mb-3" onClick={() => handleLogout()}><FaArrowRightFromBracket /><span>Logout</span></button>


                    </div>
                    {/* Sidebar content here */}
                    <li><NavLink to={"/dashboard"} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Dashboard</NavLink></li>
                    <li><NavLink to={'/dashboard/all-user'} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Users</NavLink></li>
                    <li><NavLink to={'/dashboard/movies'} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Movies</NavLink></li>
                    <li><NavLink to={'/dashboard/shows'} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Movie Shows</NavLink></li>
                    <li><NavLink to={'/dashboard/all-booking'} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Booking</NavLink></li>
                </ul>

            </div>
        </div>
    )
};

export default AdminLayout;