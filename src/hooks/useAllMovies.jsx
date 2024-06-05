import useSWR from "swr";
import axiosInstance from "../../axiosConfig";

<<<<<<< HEAD
const useAllMovies = (currentPage, searchValue, softDeletedData) => {
  console.log(softDeletedData, "úseMo");
  const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
  const {
    data: movies = [],
    mutate,
    isLoading,
  } = useSWR(
    searchValue || currentPage
      ? `/movies?page=${currentPage}&search=${searchValue}&isDeleted=${softDeletedData}`
      : "/movies",
    fetcher
  );
  return { movies, mutate, isLoading };
};

export default useAllMovies;
=======

const useAllMovies = (currentPage, searchValue) => {
    const fetcher = url => axiosInstance.get(url).then(res => res.data)
    const { data: movies = [], mutate, isLoading } = useSWR(searchValue || currentPage ? `/movie?page=${currentPage}&search=${searchValue}`:'/movie'  , fetcher)
    return { movies, mutate, isLoading }



};

export default useAllMovies;
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
