import useSWR from "swr";
import Heading from "../../../components/AdminComponents/Heading";
import BookingTable from "../../../components/AdminComponents/BookingTable";
import SearchInput from "../../../components/CommonComponents/SearchInput";
import Pagination from "../../../components/CommonComponents/Pagination";
import { useState } from "react";
import axiosInstance from "../../../../axiosConfig";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const ShowBookingPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState(null);
    const { data: allBooking = [], mutate,isLoading:isBookingLoading } = useSWR(`/booking/all-booking?page=${currentPage}&search=${searchValue}`, fetcher);

    return (
        <>
        <Heading title={'ALL Booking'} />
        <section className="my-container pt-10 ">
        <div className="w-full md:w-80">
                    <SearchInput setSearchValue={setSearchValue} />
                </div>
            <BookingTable allBooking={allBooking?.data} isBookingLoading={isBookingLoading}/>
            <div className=" mt-3">
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={allBooking?.totalPages} />
                </div>
        </section>
        </>
    );
};

export default ShowBookingPage;