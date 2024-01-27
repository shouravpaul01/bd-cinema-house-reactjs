import moment from "moment";
import { FaInfo } from "react-icons/fa6";
import Loading from "../CommonComponents/Loading";


const BookingTable = ({allBooking,isBookingLoading}) => {
    if (isBookingLoading) {
        return <Loading/>
    }
    return (
        <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-sm">
                            <th>Order no</th>
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
                                <td>{booking?.movie?.name}</td>
                                <td>{moment(booking?.date).format('ll')}</td>
                                <td>{booking?.time}</td>
                                <td>{booking?.seat?.join(',')}</td>
                                <td>
                                <button onClick={() => {}} className="btn btn-sm btn-circle btn-primary " ><FaInfo /></button>
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