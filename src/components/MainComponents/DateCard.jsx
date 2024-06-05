import moment from "moment";
import React, { useEffect, useState } from "react";

const DateCard = ({ handleMoviesByDate, moviesShowDate }) => {
  const [matchIndex, setMatchIndex] = useState(1);
  const selectedData = moviesShowDate ? moviesShowDate[0] : null;
  useEffect(() => {
    handleMoviesByDate(selectedData);
  }, [selectedData]);
  return (
    <>
      <h3 className="text-2xl font-semibold  mb-3">Select Date</h3>
      <div className="flex flex-wrap gap-3">
        {moviesShowDate?.map((date, index) => (
          <div
            key={index + 1}
            onClick={() => {
              handleMoviesByDate(date), setMatchIndex(index + 1);
            }}
            className={`${
              matchIndex === index + 1
                ? "bg-white text-indigo-700 border border-indigo-400 shadow-2xl shadow-indigo-300"
                : ""
            }bg-white w-24 rounded-md  p-2`}
          >
            <p>{moment(date).format("ddd")}</p>
            <p>
              <span className="text-2xl pe-2">{moment(date).format("D")}</span>
              {moment(date).format("MMM")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(DateCard);
// export default DateCard;
