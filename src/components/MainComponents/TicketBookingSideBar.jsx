import axios from 'axios';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { BsTicketDetailed } from 'react-icons/bs';
import leo from "../../assets/images/Leo.png"
import { FaCalendarDays, FaChair, FaRegClock, FaRegMoneyBill1 } from 'react-icons/fa6';
import axiosInstance from '../../../axiosConfig';

const TicketBookingSideBar = ({ selectedDate, selectedMovie, selectedScheduleTime, selectedSeatType, ticketQuantity, selectedSeat, totalAmount, bookingId }) => {
    const { register, handleSubmit, reset, setValue, setError, formState: { errors } } = useForm()
    console.log(selectedSeat?.length == ticketQuantity, !bookingId);
    const handlePurchaseTicket = (data) => {
        if (bookingId && selectedSeat?.length == ticketQuantity) {
            console.log(data)
            axiosInstance.post(`/booking/purchase-confirm/${bookingId}`, data)
                .then(res => {
                    window.location.replace(res.data.url)
                })

        }
        // console.log('pi') 
    }
    return (

        <div className="md:sticky md:top-20 w-full md:w-80  bg-white outline-dashed outline-1 outline-violet-900 rounded-lg px-4 py-8">
            <div className="flex gap-4">
                {
                    selectedMovie ? <><div className=''>
                        <img src={leo} className='w-20 h-28 rounded-md' alt="movie picture" />
                    </div>
                        <div className='space-y-1'>
                            <span className="badge">{selectedMovie?.category}</span>
                            <h2 className='font-semibold text-indigo-500'>{selectedMovie?.name}</h2>
                            <p className='text-xs text-gray-400'>Duration-{selectedMovie?.duration}</p>
                        </div>
                    </> : <>

                        <div className="skeleton w-24 h-28 "></div>
                        <div className='flex flex-col justify-center gap-2 w-full'>
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>

                    </>
                }

            </div>
            <div className="my-4">
                <div className="flex mt-4">
                    <p className="flex items-center gap-3 grow"> <FaCalendarDays /> Show Date</p>
                    <p >{selectedDate ? moment(selectedDate).format('ll') : '--'}</p>
                </div>
                <div className="flex  mt-4">
                    <p className="flex items-center gap-3 grow"> <FaCalendarDays /> Hall Name</p>
                    <p >BD-cinema-house</p>
                </div>
                <div className="flex  mt-4">
                    <p className="flex items-center gap-3 grow"> <FaRegClock />Show Time</p>
                    <p >{selectedScheduleTime ? selectedScheduleTime : '--'}</p>
                </div>
                <div className="flex  mt-4">
                    <p className="flex items-center gap-3 grow"> <FaChair />Seat Type</p>
                    <p >{selectedSeatType ? selectedSeatType.seatType : '--'}</p>
                </div>
                <div className="flex mt-4">
                    <p className="flex items-center gap-3 grow"> <BsTicketDetailed /> Ticket Quantity</p>
                    <p >{ticketQuantity ? ticketQuantity : '--'}</p>
                </div>
                <div className="flex  mt-4">
                    <p className="flex items-center gap-3 grow"> <FaChair />Selected Seat</p>
                    <p >{
                        selectedSeat?.length <= 0 ? "--" : selectedSeat?.join(',')
                    }</p>
                </div>
                <div className="flex  mt-4">
                    <p className="flex items-center gap-3 grow"> <FaRegMoneyBill1 /> Total Amount</p>
                    <p >{totalAmount ? `${totalAmount} BDT` : '--'}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit(handlePurchaseTicket)} className="space-y-3 ">
                <label >Ticket For</label>
                <input type="text" {...register('name', { required: true })} className={`input input-sm input-bordered input-primary ${errors?.name ? "input-error" : ''} w-full`} placeholder="Full Name" />
                <input type="number" {...register('phoneNumber', { required: true, maxLength: 11 ,minLength:11})} className={`input input-sm input-bordered input-primary ${errors?.phoneNumber ? "input-error" : ''} w-full`} placeholder="Phone Number" />
                {/* Button will disable when booking id not found */}
                <button type="submit" className={`btn btn-sm  btn-primary w-full`} disabled={!(bookingId && selectedSeat?.length == ticketQuantity)}>Purchase Ticket</button>

            </form>
        </div>
    );
};

export default TicketBookingSideBar;