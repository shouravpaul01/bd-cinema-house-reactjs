import useAuth from "./useAuth";
import useSWR from "swr";


const useClaintUser = () => {
    const {user}=useAuth()
 
   const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data: claintUser ,isLoading:isClaintLoading,mutate } = useSWR(`http://localhost:3000/user/claint-user?email=${user?.email}`, fetcher);
    return {claintUser,isClaintLoading,mutate}

};

export default useClaintUser 