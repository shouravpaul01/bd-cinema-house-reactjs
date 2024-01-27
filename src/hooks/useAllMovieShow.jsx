import useSWR from "swr";
import axiosInstance from "../../axiosConfig";


const useAllMovieShow = (currentPage) => {
        const fetcher = url => axiosInstance.get(url).then(res => res.data)
        const { data:moviesShow=[],mutate } = useSWR(`/show?page=${currentPage}`, fetcher)
        return {moviesShow,mutate}
};

export default useAllMovieShow;