import useSWR from "swr";
import useAuth from "./useAuth";


const useAdminUser = () => {
   const {user}=useAuth()

   const fetcher = (...args) => fetch(...args).then(res => res.json())
   const { data: adminUser ,mutate ,isLoading:isAdminLoading } = useSWR(`http://localhost:3000/user/admin-user?email=${user?.email}`, fetcher);
   return {adminUser,isAdminLoading,mutate}
  
};

export default useAdminUser;