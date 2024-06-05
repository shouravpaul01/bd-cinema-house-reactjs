import useSWR from "swr";
import axiosInstance from "../../axiosConfig";

const useAllMovies = (currentPage, searchValue, softDeletedData) => {
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
