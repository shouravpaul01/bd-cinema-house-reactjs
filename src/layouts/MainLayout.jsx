import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div className="bg-pink-50">
           <Outlet/> 
        </div>
    );
};

export default MainLayout;