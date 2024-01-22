import axios from 'axios';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { BsTicketDetailed } from 'react-icons/bs';
import { FaCalendarDays, FaChair, FaRegClock, FaRegMoneyBill1 } from 'react-icons/fa6';
import axiosInstance from '../../../axiosConfig';

const TicketBookingSideBar = ({ selectedDate, selectedScheduleTime, selectedSeatType, ticketQuantity, selectedSeat, totalAmount, bookingId }) => {
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
        <div className="md:sticky md:top-0 w-full md:w-80  bg-white rounded-lg p-4 ">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Sidebar</h1>
            </div>
            <div className="my-4">
                <div className="flex mt-4">
                    <p className="flex items-center gap-3 grow"> <FaCalendarDays /> Show Date</p>
                    <p className="">{selectedDate ? moment(selectedDate).format('ll') : '--'}</p>
                </div>
                <div className="flex  mt-4">
                    <p className="flex items-center gap-3 grow"> <FaCalendarDays /> Hall Name</p>
                    <p className="">2-3-2</p>
                </div>
                <div className="flex  mt-4">
                    <p className="flex items-center gap-3 grow"> <FaRegClock />Show Time</p>
                    <p className="">{selectedScheduleTime ? selectedScheduleTime : '--'}</p>
                </div>
                <div className="flex  mt-4">
                    <p className="flex items-center gap-3 grow"> <FaChair />Seat Type</p>
                    <p className="">{selectedSeatType ? selectedSeatType.seatType : '--'}</p>
                </div>
                <div className="flex mt-4">
                    <p className="flex items-center gap-3 grow"> <BsTicketDetailed /> Ticket Quantity</p>
                    <p className="">{ticketQuantity ? ticketQuantity : '--'}</p>
                </div>
                <div className="flex  mt-4">
                    <p className="flex items-center gap-3 grow"> <FaChair />Selected Seat</p>
                    <p className="">{
                        selectedSeat?.length <= 0 ? "--" : selectedSeat?.join(',')
                    }</p>
                </div>
                <div className="flex  mt-4">
                    <p className="flex items-center gap-3 grow"> <FaRegMoneyBill1 /> Total Amount</p>
                    <p className="">{totalAmount ? `${totalAmount} BDT` : '--'}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit(handlePurchaseTicket)} className="space-y-3 ">
                <label >Ticket For</label>
                <input type="text" {...register('name', { required: true })} className={`input input-sm input-bordered input-primary ${errors?.name ? "input-error" : ''} w-full`} placeholder="Full Name" />
                <input type="number" {...register('phoneNumber', { required: true, maxLength: 11 })} className={`input input-sm input-bordered input-primary ${errors?.phoneNumber ? "input-error" : ''} w-full`} placeholder="Phone Number" />
                {/* Button will disable when booking id not found */}
                <button type="submit" className={`btn btn-sm  btn-primary w-full`} disabled={!(bookingId && selectedSeat?.length == ticketQuantity)}>Purchase Ticket</button>

            </form>
        </div>
    );
};

export default TicketBookingSideBar;