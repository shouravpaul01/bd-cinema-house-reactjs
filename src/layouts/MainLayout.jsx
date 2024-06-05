import { Outlet } from "react-router-dom";
import Header from "../components/MainComponents/Header";
import Footer from "../components/MainComponents/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (

      <div className="bg-lime-50">
        <Header />
        <Outlet />
        <Footer />
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
