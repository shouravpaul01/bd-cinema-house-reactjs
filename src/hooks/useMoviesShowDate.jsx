import axiosInstance from '../../axiosConfig';
import useSWR from 'swr';


const useMoviesShowDate = () => {
    const fetcher = url => axiosInstance.get(url).then(res => res.data)
    const { data: moviesShowDate = [], mutate } = useSWR('/show/active-movie-show-date', fetcher)
    return {moviesShowDate,mutate}
};

export default useMoviesShowDate;