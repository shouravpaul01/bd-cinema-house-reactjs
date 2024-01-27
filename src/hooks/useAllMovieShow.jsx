import useSWR from "swr";
import axiosInstance from "../../axiosConfig";


const useAllMovieShow = (currentPage,searchValue) => {
        const fetcher = url => axiosInstance.get(url).then(res => res.data)
        const { data:moviesShow=[],mutate ,isLoading:isShowLoading} = useSWR(`/show?search=${searchValue}&page=${currentPage}`, fetcher)
        return {moviesShow,mutate,isShowLoading}
};

export default useAllMovieShow;