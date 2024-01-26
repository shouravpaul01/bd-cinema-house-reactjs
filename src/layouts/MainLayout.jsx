import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../components/MainComponents/Header";
import Footer from "../components/MainComponents/Footer";
import useAuth from "../hooks/useAuth";
import Loading from "../components/CommonComponents/Loading";


const MainLayout = () => {
    const {isLoading}=useAuth()
    if (isLoading) {
        return <Loading/>
    }
    return (
        <div className="bg-lime-50">
            <Header/>
            <Outlet />
            <Footer/>
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
    );
};

export default MainLayout;