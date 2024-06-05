
import moment from "moment";
import { FaRegClock } from "react-icons/fa6";

const ShowDetails = ({ details }) => {
  return (
    <div>
      <div className="flex justify-center">
        <img
          src={details?.movie?.image?.url}
          className="w-[100px] h-[150px] rounded-md"
          alt={details?.movie?.name}
        />
      </div>
      <div>
        <p>
          <span className="font-bold me-2">Title:</span>
          {details?.movie?.title}
        </p>
        <p>
          <span className="font-bold me-2">Date: </span>
          {moment(details?.date).format("ll")}
        </p>

        <p>
          <span className="font-bold">Time:</span>
          <div className="flex flex-wrap gap-2">
            {details?.showTimesTypesPrice?.map((time, index) => (
              <div
                key={index}
                className="border border-violet-300 rounded-md p-4"
              >
                <div className="border-b border-violet-300 pb-2">
                  <p className="badge badge-secondary badge-outline">
                    <FaRegClock className="me-2" />
                    {time?.time}{" "}
                  </p>
                </div>
                <div className="flex flex-col justify-center">
                  {time?.seatTypesPrice?.map((seat, index) => (
                    <span key={index}>
                      {seat?.seatType == "regular"
                        ? `R: ${seat?.price} Tk`
                        : `P: ${seat?.price} TK`}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </p>
      </div>
    </div>
  );
};

export default ShowDetails;
