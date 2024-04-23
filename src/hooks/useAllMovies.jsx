import useSWR from "swr";
import axiosInstance from "../../axiosConfig";


const useAllMovies = (currentPage, searchValue) => {
    const fetcher = url => axiosInstance.get(url).then(res => res.data)
    const { data: movies = [], mutate, isLoading } = useSWR(searchValue || currentPage ? `/movie?page=${currentPage}&search=${searchValue}`:'/movie'  , fetcher)
    return { movies, mutate, isLoading }



};

export default useAllMovies;