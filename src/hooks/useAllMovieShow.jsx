import useSWR from "swr";
import axiosInstance from "../../axiosConfig";


const useAllMovieShow = () => {
        const fetcher = url => axiosInstance.get(url).then(res => res.data)
        const { data:moviesShow=[],mutate } = useSWR('/show', fetcher)
        return {moviesShow,mutate}
};

export default useAllMovieShow;