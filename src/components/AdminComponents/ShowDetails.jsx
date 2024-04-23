import { FaRegClock } from "react-icons/fa6";


const ShowDetails = ({ details }) => {
    return (
        <div>
            <div className="flex justify-center">
                <img src={details?.movie?.image?.url} className="w-[100px] h-[150px] rounded-md" alt={details?.movie?.name} />
            </div>
            <div>
                <p><span className="font-bold">Name:</span>{details?.moive?.name}</p>
                <p><span className="font-bold">Date:</span>{details?.date}</p>

                <p><span className="font-bold">Time:</span><div className="flex flex-wrap gap-2">
                    {
                        details?.showTimesTypesPrice?.map((time, index) => <div key={index} className="border border-violet-300 rounded-md p-4">
                            <div className="border-b border-violet-300 pb-2">
                                <p className="badge badge-secondary badge-outline"><FaRegClock className="me-2" />{time?.time?.value} </p>
                            </div>
                            <div className="flex flex-col justify-center">
                                {
                                    time?.seatTypesPrice?.map((seat, index) => <span key={index}>{seat?.seatType == 'regular' ? `R: ${seat?.price}` : `P: ${seat?.price}`}</span>)
                                }
                            </div>
                        </div>)
                    }
                </div></p>
            </div>
        </div>
    );
};

export default ShowDetails;