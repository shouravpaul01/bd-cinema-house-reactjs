import moment from "moment";
import { useEffect, useState } from "react";
import useMoviesShowDate from "../../hooks/useMoviesShowDate";


const DateCard = ({ handleShowByDate }) => {
    const { moviesShowDate } = useMoviesShowDate()
    const [matchIndex, setMatchIndex] = useState(1)
    useEffect(()=>{
        handleShowByDate(moviesShowDate[0])
    },[moviesShowDate])
    return (
        <>
            {
                moviesShowDate.map((date, index) => <div key={index + 1}   onClick={() => { handleShowByDate(date), setMatchIndex(index + 1) }} className={`${matchIndex === index + 1 ? 'bg-white text-indigo-700 border border-indigo-400 shadow-2xl shadow-indigo-300' : ''}bg-white w-1/6 rounded-md  p-2`}>
                    <p>{moment(date).format("ddd")}</p>
                    <p><span className="text-2xl pe-2">{moment(date).format("D")}</span>{moment(date).format("MMM")}</p>
                </div>)
            }


            <div className="bg-white w-1/6 rounded-md  p-2">
                <p>Sun</p>
                <p><span className="text-xl">7</span>Dec</p>
            </div>
        </>
    );
};

export default DateCard;