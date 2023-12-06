import React, { useState } from 'react';
import leo from "../../assets/images/Leo.png"
import { Fa1, FaCheck } from 'react-icons/fa6';

const MovieCard = ({movies,handleScheduleTime}) => {
    const [selectMovie,setSelectMovie]=useState(null)
    return (
        <>
        {
            movies?.map(movie => <div key={movie._id} onClick={()=>{handleScheduleTime(movie._id),setSelectMovie(movie._id)}} className='relative w-1/6'>
                {selectMovie == movie._id && <p className='bg-white rounded-full text-indigo-500 w-7 h-7 flex items-center justify-center absolute top-1/3 left-1/3'><FaCheck/></p>}
                
                <img src={leo} className={`${selectMovie == movie._id && 'border border-indigo-500 shadow-md shadow-indigo-400'} rounded-md `} alt="leo" />
                
                <p>{movie.movie.name}</p>
            </div>)
        }
        </>
    );
};

export default MovieCard;