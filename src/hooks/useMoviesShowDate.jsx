import axiosInstance from '../../axiosConfig';
import useSWR from 'swr';

<<<<<<< HEAD

=======
>>>>>>> 7ba1bcddbc49b927c790f593fe92dada87ebe39f
const useMoviesShowDate = () => {
    const fetcher = url => axiosInstance.get(url).then(res => res.data)
    const { data: moviesShowDate = [], mutate } = useSWR('/show/active-movie-show-date', fetcher)
    return {moviesShowDate,mutate}
};

export default useMoviesShowDate;