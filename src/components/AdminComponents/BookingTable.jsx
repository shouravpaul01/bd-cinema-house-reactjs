import moment from "moment";
import { FaCircleInfo, FaInfo, FaRegClock } from "react-icons/fa6";
import Loading from "../CommonComponents/Loading";

<<<<<<< HEAD
const BookingTable = ({ allBooking, isBookingLoading }) => {
  return (
    <div className="overflow-x-auto pt-6">
      <table className="table bg-white">
        {allBooking?.length == 0 && (
          <caption className=" caption-bottom">
            <div className="flex gap-2 items-center justify-center text-lg py-2">
              <FaCircleInfo />
              <span className="">Data not found.</span>
            </div>
          </caption>
        )}
        {/* head */}
        <thead className="bg-violet-300">
          <tr className="text-sm">
            <th>Order no</th>
            <th>Email</th>
            <th>Movie Name</th>
            <th>Schedule Date</th>
            <th>Show Time</th>
            <th>Seat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Displayed all booking */}
          {allBooking ? (
            allBooking.map((booking, index) => (
              <tr key={booking?._id}>
                <th>{index + 1}</th>
                <td>{booking?.email}</td>
                <td>{booking?.movie?.name}</td>
                <td>{moment(booking?.date).format("ll")}</td>
                <td>
                  <span className="badge badge-secondary badge-outline w-28">
                    <FaRegClock className="me-2" /> {booking?.time}
                  </span>
                </td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    {booking?.seat?.map((seat, index) => (
                      <span key={index} className="badge badge-success">
                        {seat}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => {}}
                    className="btn btn-sm btn-circle btn-primary "
                  >
                    <FaInfo />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <div role="alert" className="alert">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Booking not found</span>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
=======

const BookingTable = ({ allBooking, isBookingLoading }) => {

    return (
        <div className="overflow-x-auto pt-6">
            <table className="table bg-white">
                {
                    allBooking?.length == 0 && <caption className=" caption-bottom">
                        <div className='flex gap-2 items-center justify-center text-lg py-2'>
                            <FaCircleInfo />
                            <span className=''>Data not found.</span>
                        </div>

                    </caption>
                }
                {/* head */}
                <thead className="bg-violet-300">
                    <tr className="text-sm">
                        <th>Order no</th>
                        <th>Email</th>
                        <th>Movie Name</th>
                        <th>Schedule Date</th>
                        <th>Show Time</th>
                        <th>Seat</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Displayed all booking */}
                    {
                        allBooking ? allBooking.map((booking, index) => <tr key={booking?._id}>
                            <th>{index + 1}</th>
                            <td>{booking?.email}</td>
                            <td>{booking?.movie?.name}</td>
                            <td>{moment(booking?.date).format('ll')}</td>
                            <td>
                                <span className="badge badge-secondary badge-outline"><FaRegClock className="me-2" /> {booking?.time}</span>
                            </td>
                            <td>
                                <div className="flex flex-wrap gap-2">
                                    {booking?.seat?.map((seat, index) => <span key={index} className="badge badge-success">{seat}</span>)}
                                </div>
                            </td>
                            <td>
                                <button onClick={() => { }} className="btn btn-sm btn-circle btn-primary " ><FaInfo /></button>
                            </td>
                        </tr>) : <div role="alert" className="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Booking not found</span>
                        </div>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default BookingTable;
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
