import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdminUser from "../hooks/useAdminUser";
import Loading from "../components/CommonComponents/Loading";


const AdminRoute = ({children}) => {
    const {adminUser,isAdminLoading}=useAdminUser()
    const {user}=useAuth()
    const location=useLocation()

    if (isAdminLoading) {
        return <Loading/>
    }
    if(user && adminUser){
        return children
    }
    return <Navigate to={'/'} state={{from:location}} replace></Navigate>
};

export default AdminRoute;