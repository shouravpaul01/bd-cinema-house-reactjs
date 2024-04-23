import useSWR from "swr";
import BookingTable from "../../../components/AdminComponents/BookingTable";
import Pagination from "../../../components/CommonComponents/Pagination";
import { useState } from "react";
import axiosInstance from "../../../../axiosConfig";
import Loading from "../../../components/CommonComponents/Loading";
import InputSearch from "../../../components/CommonComponents/InputSearch";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const ShowBookingPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const { data: allBooking = [], mutate,isLoading } = useSWR(`/booking/all-booking?page=${currentPage}&search=${searchValue}`, fetcher);

    return (
        <section >
        
        <div className="bg-gray-100 mt-4">
            <div className='  bg-violet-700 py-2 px-4'>

                <p className="font-bold text-white flex-1">All Booking</p>
               
            </div>
            <div className="px-4 py-5">

                <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
                    <div className="w-full md:w-80">
                        <InputSearch setSearchValue={setSearchValue} classNameSearch={' border border-violet-400 rounded-full py-1   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'} />
                    </div>

                </div>
                {
                    isLoading ? <Loading /> : <BookingTable allBooking={allBooking?.data} isBookingLoading={isLoading}/>
                }


                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={allBooking?.totalPages} />



            </div>
        </div>
    </section>
        
    );
};

export default ShowBookingPage;