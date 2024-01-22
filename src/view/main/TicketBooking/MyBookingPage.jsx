import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useSWR from "swr";
import moment from "moment";

const fetcher = (...args) => fetch(...args).then(res => res.json())
const MyBookingPage = () => {
    const {user}=useAuth()

    const { data: myBookings=[] ,mutate } = useSWR(`http://localhost:3000/booking/my-booking?email=${user?.email}`, fetcher);

    console.log(myBookings);
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
                        {/* row 1 */}
                        {
                            myBookings.map((myBooking,index)=><tr key={myBooking?._id}>
                                <th>{index+1}</th>
                                <td>{myBooking?.movie?.name}</td>
                                <td>{moment(myBooking?.date).format('ll')}</td>
                                <td>{myBooking?.time}</td>
                                <td>{myBooking?.seat?.join(',')}</td>
                                <td><button className="btn btn-xs btn-primary">Ticket Print</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyBookingPage;