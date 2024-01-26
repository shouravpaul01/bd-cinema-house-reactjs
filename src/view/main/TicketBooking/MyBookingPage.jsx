import useAuth from "../../../hooks/useAuth";
import useSWR from "swr";
import moment from "moment";

const fetcher = (...args) => fetch(...args).then(res => res.json())
const MyBookingPage = () => {
    const { user } = useAuth()
    const { data: myBookings = [], mutate } = useSWR(`http://localhost:3000/booking/my-booking?email=${user?.email}`, fetcher);

    return (
        <section className="my-container pt-10 py-20 ">

            <div className="overflow-x-auto md:px-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-sm">
                            <th>Order no</th>
                            <th>Movie Name</th>
                            <th>Date</th>
                            <th>Show Time</th>
                            <th>Seat</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Displayed all own booking */}
                        {
                            myBookings ? myBookings.map((myBooking, index) => <tr key={myBooking?._id}>
                                <th>{index + 1}</th>
                                <td>{myBooking?.movie?.name}</td>
                                <td>{moment(myBooking?.date).format('ll')}</td>
                                <td>{myBooking?.time}</td>
                                <td>{myBooking?.seat?.join(',')}</td>
                                <td><button className="btn btn-xs btn-primary">Ticket Print</button></td>
                            </tr>) : <div role="alert" className="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>Booking not found</span>
                            </div>
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyBookingPage;