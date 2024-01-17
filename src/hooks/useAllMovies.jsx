import useSWR from "swr";
import axiosInstance from "../../axiosConfig";


const useAllMovies = () => {
    const fetcher = url => axiosInstance.get(url).then(res => res.data)
    const { data:movies=[],mutate } = useSWR('/movie', fetcher)
    return {movies,mutate}
};

export default useAllMovies;