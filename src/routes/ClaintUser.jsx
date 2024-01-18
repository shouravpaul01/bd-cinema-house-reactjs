import { Navigate, useLocation } from 'react-router-dom';
import useClaintUser from '../hooks/useClaintUser';
import useAuth from '../hooks/useAuth';
import Loading from '../components/CommonComponents/Loading';

const ClaintUser = ({children}) => {
    const {claintUser,isClaintLoading}=useClaintUser()
    const {user}=useAuth()
    const location=useLocation()

    if (isClaintLoading) {
        return <Loading/>
    }
    if(user && claintUser){
        return children
    }
    return <Navigate to={'/'} state={{from:location}} replace></Navigate>
};

export default ClaintUser;