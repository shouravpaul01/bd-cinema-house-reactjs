import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/CommonComponents/Loading";

const PrivateRoute = ({ children, roles }) => {
   const { user, isLoading } = useAuth()
   const location = useLocation()
   const checkRole = roles?.includes(user?.role)
   console.log(user?.role, 'user');
   console.log(user, 'checkRole');
   if (isLoading) {
      return <Loading />
   }
   if (user && checkRole) {
      return children
   }
   return <Navigate to={'/signin'} state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;