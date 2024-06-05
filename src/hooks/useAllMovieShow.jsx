import useSWR from "swr";
import axiosInstance from "../../axiosConfig";

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
