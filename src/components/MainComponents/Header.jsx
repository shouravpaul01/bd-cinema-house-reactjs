import { Link, NavLink } from "react-router-dom";
import { FaAngleDown, FaAngleUp, FaArrowRightFromBracket, FaBars, FaCircleUser, FaUserShield } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import movieIcon from '../../../public/movie.svg'


const Header = () => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)

    const { user, logout } = useAuth()

    // Sidebar hide when  Mobile menu item click
    const handleSidebarClose = () => {
        document.getElementById('my-drawer-3').checked = false
    }

    const handleLogout = () => {
        logout()
            .then(() => {
                
            })
            .catch((error) => console.log(error))
    };

    const commonNavLink = <>
        <li className="nav-item"><NavLink to={'/'} className={({ isActive }) => isActive ? 'nav-active-link ' : ''} >Ticket</NavLink></li>
        <li className="nav-item"><NavLink to={'/my-booking'} className={({ isActive }) => isActive ? 'nav-active-link' : ''}> My Booking</NavLink></li>
       
    </>
    const beforeSignInNavLink = <>
        <li><NavLink to={'/signin'} className={({ isActive }) => isActive ? 'active-link-signin' : 'btn btn-sm btn-outline btn-secondary rounded-full w-full'} onClick={() => handleSidebarClose()}><FaUserShield /> Singin/Up</NavLink></li>
    </>
    const afterSignInNavLink = <>
        <li>
            <div className="dropdown dropdown-bottom md:dropdown-end">
                <label tabIndex={0} onClick={() => setIsOpenDropdown(!isOpenDropdown)} className={`btn btn-sm rounded-full  btn-outline btn-warning text-xl  ${isOpenDropdown ? 'btn-warning' : ''}`}>
                        <div className="me-3 rounded-full">
                            <FaCircleUser />
                        </div>
                    <span >{isOpenDropdown ? <FaAngleDown /> : <FaAngleUp />}</span></label>
                {
                   isOpenDropdown &&  <ul tabIndex={0} onClick={() => setIsOpenDropdown(!isOpenDropdown)} className="dropdown-content z-[1] menu-item  shadow bg-white rounded-lg animate-custom mt-4 w-52 ">
                        
                        <li>
                        <NavLink onClick={() => handleLogout()} ><FaArrowRightFromBracket />Logout</NavLink>
                           
                        </li>
                    </ul>
                }
            </div>
        </li>
    </>


    const navLink = user ? afterSignInNavLink : beforeSignInNavLink;
    return (
        <>
            <header className="my-container  sticky top-0 z-10">

                <div className="drawer">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col ">
                        {/* Navbar */}
                        <div className="w-full  navbar min-h-[30px]  bg-violet-900   shadow-lg outline-dashed outline-1 outline-offset-2 outline-violet-900   px-2 rounded-b-3xl ">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" >
                                    <FaBars className="text-white animate-bounce" />
                                </label>
                            </div>
                            <div className="md:flex-1">
                                <Link to={'/'} className="flex items-center justify-center gap-3 ms-4">
                                    <img src={movieIcon} alt="logo" className="w-10 h-10" />
                                    <p className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-white">BD-Cinema House</p>
                                </Link>
                            </div>

                            <div className="flex-none hidden lg:block">
                                <ul className="md:flex hidden md:text-white items-center justify-center gap-10 ">
                                    {/* Navbar menu content here */}
                                    {commonNavLink}
                                    {navLink}
                                </ul>
                            </div>
                        </div>

                    </div>
                    {/* Mobile menu */}
                    <div className="drawer-side z-50 md:hidden">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu-item   p-4 w-80 min-h-full bg-violet-900">
                            {/* Sidebar content here */}
                            <div>
                                <Link to={'/'} className="flex items-center justify-center gap-3 mt-8 mb-6" onClick={() => handleSidebarClose()}>
                                    <img src={movieIcon} alt="logo" className="w-10 h-10" />
                                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-white">BD-Cinema House</p>
                                </Link>
                            </div>
                            {commonNavLink}
                            {navLink}
                        </ul>
                    </div>
                </div>
            </header>

        </>
    );
};

export default Header;