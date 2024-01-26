import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import movieIcon from '../../../../public/movie.svg'
import { FaBangladeshiTakaSign, FaCalendarDays, FaClock, FaPhone, FaRegClock, FaUserTie } from 'react-icons/fa6';
import { RiMovie2Line } from "react-icons/ri";
import { MdEventSeat } from "react-icons/md";
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
const fetcher = (...args) => fetch(...args).then(res => res.json())

const BookingSuccessPage = () => {
    const { bookingId } = useParams()
    const printToPdf = useRef();
    const { data: booking, mutate } = useSWR(`http://localhost:3000/booking/my-booking?bookingId=${bookingId}`, fetcher);

    console.log(booking);
    const handlePrint = useReactToPrint({
        content: () => printToPdf.current,
      });
    
    return (
        <section className='my-container py-20'>
            
                <div className='flex justify-end me-9 border-b pb-2'>
                    <button className='btn btn-sm btn-primary' onClick={handlePrint}>Print/Download</button>
                </div>
                <div className='flex justify-center items-center pt-6' ref={printToPdf}>

                <div className='w-auto md:w-96 bg-white p-4 rounded-md shadow-lg '>
                    <div className='border border-dashed border-violet-900 rounded-md p-6'>
                        <div className='flex items-center gap-2 bg-violet-900 rounded-full py-3 px-6'>
                            <img src={movieIcon} alt="logo" className="w-10 h-10" />
                            <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-white ">BD-Cinema House</p>
                        </div>

                        <p className='font-bold text-center py-3'>{moment(booking?.date).format('dddd') + ',' + moment(booking?.date).format('LL')} <br /><span className="badge badge-secondary badge-outline"><FaRegClock className='me-2' /> {booking?.time} </span> </p>



                        <div>
                            <div className='border p-3'>
                                <div className="flex mt-4">
                                    <p className="flex items-center gap-3 grow"> <RiMovie2Line /> Movie Name:</p>
                                    <p className='font-semibold text-secondary'>{booking?.movie?.name}</p>
                                </div>
                                <div className="flex mt-4">
                                    <p className="flex items-center gap-3 grow"> <MdEventSeat /> Seat No:</p>
                                    <p >{
                                        booking?.seat.map((element, index) => <span key={index + 1} className="badge badge-secondary badge-outline">{element}</span>)
                                    }</p>
                                </div>
                                <div className="flex mt-4">
                                    <p className="flex items-center gap-3 grow"> <FaBangladeshiTakaSign /> Total Amount:</p>
                                    <p >{booking?.totalAmount} Tk</p>
                                </div>
                                <div className="flex mt-4">
                                    <p className="flex items-center gap-3 grow"> <FaUserTie /> Name:</p>
                                    <p >{booking?.name}</p>
                                </div>
                                <div className="flex mt-4">
                                    <p className="flex items-center gap-3 grow"> <FaPhone /> Name:</p>
                                    <p >{booking?.phoneNumber}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                </div>
           
        </section>
    );
};

export default BookingSuccessPage;