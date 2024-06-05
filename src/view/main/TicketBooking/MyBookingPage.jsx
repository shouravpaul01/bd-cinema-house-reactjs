import useAuth from "../../../hooks/useAuth";
import useSWR from "swr";
import moment from "moment";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import TicketOnlineCard from "../../../components/MainComponents/TicketOnlineCard";
import axiosInstance from "../../../../axiosConfig";
import { FaCircleInfo, FaPrint } from "react-icons/fa6";
import Pagination from "../../../components/CommonComponents/Pagination";
import useTitle from "../../../hooks/useTitle";
import Loading from "../../../components/CommonComponents/Loading";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
const MyBookingPage = () => {
  useTitle("My booking");
  const { user } = useAuth();
  const printToPdf = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [booking, setBooking] = useState(null);

  const { data: myBookings = [], isLoading } = useSWR(
    `/booking/my-booking?email=${user?.email}&page=${currentPage}`,
    fetcher
  );
  console.log(booking);
  const handlePrint = useReactToPrint({
    content: () => printToPdf.current,
  });
  return (
    <section className="my-container pt-10 py-20 ">
      <div className="md:px-10">
        {isLoading && <Loading />}
        <div className="overflow-x-auto ">
          <table className="table">
            {myBookings?.data?.data?.length == 0 && (
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
                <th>Movie Name</th>
                <th>Date</th>
                <th>Show Time</th>
                <th>Seat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Displayed all own booking */}
              {myBookings ? (
                myBookings?.data?.data?.map((myBooking, index) => (
                  <tr key={myBooking?._id}>
                    <th>{index + 1}</th>
                    <td>{myBooking?.movie?.name}</td>
                    <td>{moment(myBooking?.date).format("ll")}</td>
                    <td>{myBooking?.time}</td>
                    <td>
                      <span className="badge badge-secondary me-2">
                        {myBooking?.seat?.map((seat) => seat)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="w-28 btn btn-xs btn-primary"
                        onClick={() => {
                          handlePrint(), setBooking(myBooking);
                        }}
                      >
                        <FaPrint />
                        Ticket Print
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
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={myBookings?.data?.totalPages}
        />
      </div>

      <div className="hidden">
        <div ref={printToPdf}>
          <TicketOnlineCard booking={booking} />
        </div>
      </div>
    </section>
  );
};

export default MyBookingPage;
