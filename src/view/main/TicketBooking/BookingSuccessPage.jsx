import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { useReactToPrint } from 'react-to-print';
import useAuth from '../../../hooks/useAuth';
import TicketOnlineCard from '../../../components/MainComponents/TicketOnlineCard';
const fetcher = (...args) => fetch(...args).then(res => res.json())

const BookingSuccessPage = () => {
    const { bookingId } = useParams()
    const { user } = useAuth()
    const printToPdf = useRef(null);
    const { data: booking, mutate } = useSWR(`http://localhost:3000/booking/my-booking?bookingId=${bookingId}&email=${user?.email}`, fetcher);


    const handlePrint = useReactToPrint({
        content: () => printToPdf.current,
    });

    return (
        <section className='my-container py-20'>
            <div className='flex justify-end me-9 border-b pb-2'>
                <button className='btn btn-sm btn-primary' onClick={handlePrint}>Print/Download</button>
            </div>
            <div ref={printToPdf}>


                {
                    booking ? (<TicketOnlineCard booking={booking} />) : (<div role="alert" className="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>Ticket not found.</span>
                    </div>)}
            </div>


        </section>
    );
};

export default BookingSuccessPage;