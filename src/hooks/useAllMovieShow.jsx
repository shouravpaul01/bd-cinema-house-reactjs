import useSWR from "swr";
import axiosInstance from "../../axiosConfig";

<<<<<<< HEAD
const useAllMovieShow = (currentPage, searchValue, softDeletedData) => {
  const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
  const {
    data: moviesShow = [],
    mutate,
    isLoading,
  } = useSWR(
    `/showtimes?page=${currentPage}&search=${searchValue}&isDeleted=${softDeletedData}`,
    fetcher
  );
  return { moviesShow, mutate, isLoading };
};

export default useAllMovieShow;
=======

const useAllMovieShow = (currentPage,searchValue) => {
        const fetcher = url => axiosInstance.get(url).then(res => res.data)
        const { data:moviesShow=[],mutate ,isLoading} = useSWR(`/show?page=${currentPage}&search=${searchValue}`, fetcher)
        return {moviesShow,mutate,isLoading}
};

export default useAllMovieShow;
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
