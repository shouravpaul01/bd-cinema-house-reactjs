import React from "react";
import leo from "../../assets/images/Leo.png"
import { FaCheck } from 'react-icons/fa6';

const MovieCard = ({ movies, handleScheduleTime,setSelectedMovie,selectedMovie }) => {
    
    console.log(movies);
    return (
        <>
            <h3 className="text-2xl font-semibold  mb-3">Select Movie ({movies?.length})</h3>
            <div className="flex gap-3">
                {
                    movies?.map(movie => <div key={movie._id} onClick={() => { handleScheduleTime(movie._id), setSelectedMovie({_id:movie.movie._id,name:movie.movie.name,category:movie.movie.category,duration:movie.movie.duration,showId:movie._id}) }} className='relative w-1/6'>
                        {selectedMovie?.showId == movie?._id && <p className='bg-white rounded-full text-indigo-500 w-7 h-7 flex items-center justify-center absolute top-1/3 left-1/3'><FaCheck /></p>}

                        <img src={leo} className={`${selectedMovie?.showId == movie?._id && 'border border-indigo-500 shadow-md shadow-indigo-400'} rounded-md `} alt="leo" />

                        <p>{movie?.movie?.name}</p>
                    </div>)
                }
            </div>

        </>
    );
};

export default React.memo(MovieCard);



