import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const MainLayout = () => {
    return (
        <div className="bg-pink-50">
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
    );
};

export default MainLayout;