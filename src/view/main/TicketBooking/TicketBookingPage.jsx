import { FaCalendarDays, FaChair, FaMinus, FaPlus, FaRegClock, FaRegMoneyBill1 } from "react-icons/fa6";
import { BsTicketDetailed } from "react-icons/bs";
import axiosInstance from "../../../../axiosConfig";
import moment from "moment/moment";
import DateCard from "../../../components/MainComponents/DateCard";
import { useCallback, useEffect, useReducer, useState } from "react";
import useMoviesShowDate from "../../../hooks/useMoviesShowDate";
import MovieCard from "../../../components/MainComponents/MovieCard";
import ScheduleTimeCard from "../../../components/MainComponents/ScheduleTimeCard";
import SeatTypePriceCard from "../../../components/MainComponents/SeatTypePriceCard";
import useTimeCount from "../../../hooks/useTimeCount";
import { toast } from "react-toastify";

const TicketBookingPage = () => {
    const [movies, setMovies] = useState(null)
    const [scheduleTime, setScheduleTime] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedScheduleTime, setSelectedScheduleTime] = useState(null)
    const [seatTypesPrice, setSeatTypesPrice] = useState(null)
    const [selectedSeatType, setSelectedSeatType] = useState(null)
    const [ticketQuantity, setTicketQuantity] = useState(0)
    const [seats, setSeats] = useState(Array(50).fill(false));
    const displayTime = useTimeCount(ticketQuantity)
    const [selectedSeat, setSelectedSeat] = useState([])
    const [totalAmount, setTotalAmount] = useState(null)
    const [bookingId, setBookingId] = useState(null)

    console.log('bookingId', bookingId);

    useEffect(() => {
        if (ticketQuantity > 0) {
            setTotalAmount(ticketQuantity * selectedSeatType?.price)
        }
    }, [ticketQuantity])



    const handleMoviesByDate = useCallback((date) => {
        setSelectedDate(date)
        axiosInstance.get(`/show/active-movies-by-date?date=${date}`)
            .then(res => setMovies(res.data))
        setScheduleTime(null)
        setSeatTypesPrice(null)
        setSelectedSeatType(null)
    }, [])
    const handleScheduleTime = useCallback((_id) => {
        console.log('seat1');
        axiosInstance.get(`/show/active-movie-by-id/${_id}`)
            .then(res => setScheduleTime(res.data))

        setSeatTypesPrice(null)
        setSelectedSeatType(null)
        setTotalAmount(null)
    }, [])
    const handleSeatType = useCallback((showId, timeTypePriceId, showTime) => {
        console.log('seat2');
        setSelectedScheduleTime(showTime)
        axiosInstance.get(`/show/active-movie-seat-type-by-id/?showId=${showId}&timeTypePriceId=${timeTypePriceId}`)
            .then(res => setSeatTypesPrice(res.data.showTimesTypesPrice[0].seatTypesPrice))
        setSelectedSeatType(null)
        setTicketQuantity(0)
        setTotalAmount(null)
    }, [ticketQuantity])

    const handleticketQuantityPlus = () => {
        if (ticketQuantity == 10) {
            return
        }
        setTicketQuantity((prevCount) => prevCount + 1)
        setSelectedSeat([])
    }
    const handleticketQuantityMinus = () => {
        if (ticketQuantity == 0) {
            return
        }

        setTicketQuantity((prevCount) => prevCount - 1)
        // handleDeleteBooking()
        setSelectedSeat([])
    }

    const handleSeatBooking = useCallback((seat) => {
        const newSeat = [seat, ...selectedSeat]
        const data = { date: selectedDate, time: selectedScheduleTime, seatType: selectedSeatType.seatType, seat: newSeat, totalAmount: totalAmount }

        const matchedSeat = selectedSeat.filter((element) => element == seat);
        if (matchedSeat.length > 0) {
            if (bookingId) {
                handleDeleteBooking(seat)
            }
            return
        }
        if (ticketQuantity == selectedSeat.length) {
            toast.error('You selected max amount of ticket')
            return
        }
        if (bookingId && selectedSeat.length >= 1) {
            axiosInstance.patch(`/booking/${bookingId}`, data)
                .then(res => {
                    console.log(res);
                    setBookingId(res.data._id)
                })

            setSelectedSeat(newSeat)
            return
        }
        if (!bookingId) {
            axiosInstance.post('/booking', data)
                .then(res => {
                    console.log(res);
                    setBookingId(res.data._id)
                })

            setSelectedSeat(newSeat)
        }

    }, [ticketQuantity, selectedSeat, totalAmount, bookingId])

    const handleDeleteBooking = () => {
        const deleteSeat = selectedSeat.filter((element) => element !== seat);
        axiosInstance.delete(`/booking/${bookingId}`)
            .then(res => {
                setBookingId(null)
                setSelectedSeat(deleteSeat)
                console.log(res, 'delete');
            })
    }
    // const handleSeatBookingbyDoubleClick = (seat) => {
    //     console.log('handleSeatBookingbyDoubleClick');



    //     // console.log(selectedSeat);
    // }
    return (
        <div className="my-container py-24">
            <div className="flex flex-col md:flex-row gap-7  ">
                {/* Main Content */}
                <div className="flex-1 sticky top-2">
                    <div className="mb-6">
                        <DateCard handleMoviesByDate={handleMoviesByDate} />

                    </div>
                    <div className="mb-9">
                        <MovieCard handleScheduleTime={handleScheduleTime} movies={movies} />
                    </div>

                    {scheduleTime && <div className="mb-9">
                        <ScheduleTimeCard showTimesTypesPrice={scheduleTime?.showTimesTypesPrice} handleSeatType={handleSeatType} scheduleTime={scheduleTime} selectedScheduleTime={selectedScheduleTime} />

                    </div>}

                    {
                        seatTypesPrice && <div className="mb-9 flex gap-7">
                            <div className="basis-3/5 ">
                                <SeatTypePriceCard seatTypesPrice={seatTypesPrice} setSelectedSeatType={setSelectedSeatType} selectedSeatType={selectedSeatType} setTotalAmount={setTotalAmount} setTicketQuantity={setTicketQuantity} />

                            </div>
                            {
                                selectedSeatType && <div className="basis-2/5">
                                    <h3 className="text-2xl font-semibold  mb-3">Ticket Quantity</h3>

                                    <div className="flex items-center justify-center gap-5  bg-white rounded-md py-6">
                                        <button className="btn btn-sm" onClick={() => handleticketQuantityMinus()}><FaMinus /></button>
                                        <p><span className="text-lg font-bold">{ticketQuantity}   Tickets </span><br /><span className="text-xs">Mas 10 Tickets</span> </p>
                                        <button className="btn btn-sm btn-primary" onClick={() => handleticketQuantityPlus()}><FaPlus /></button>

                                    </div>

                                </div>
                            }

                        </div>
                    }
                    {
                        ticketQuantity > 0 && <div >

                            <div className=" border-b-2 pb-4 mb-6">
                                <div className="flex justify-between ">
                                    <div className="border rounded-full flex items-center justify-center w-10 h-10  text-sm animate-pulse">
                                        {displayTime.minutes + ':' + displayTime.seconds}
                                    </div>
                                    <div className="flex gap-4 text-sm font-semibold">
                                        <div className="flex items-center gap-1"><span className="w-9 h-6 rounded bg-slate-100"></span>Available
                                        </div>
                                        <div className="flex items-center gap-1"><span className="w-9 h-6 rounded bg-blue-800"></span>Selected
                                        </div>
                                        <div className="flex  items-center gap-1"><span className="w-9 h-6 rounded bg-slate-100"></span>Not Available
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <ul className="grid grid-cols-10 gap-2">
                                {

                                    seats.map((isSeatSelected, index) => {
                                        const rowLabel = String.fromCharCode('A'.charCodeAt(0) + Math.floor(index / 10));
                                        const seatNumber = (index % 10) + 1;
                                        const seatLabel = `${rowLabel}${seatNumber}`;
                                        const matchedSeats = selectedSeat.find((element) => element === seatLabel);
                                        return (<li key={index + 1} className={`btn btn-sm  ${matchedSeats ? "btn-warning" : ""} `} onClick={() => handleSeatBooking(seatLabel)} >{seatLabel}</li>)
                                    })
                                }

                            </ul>
                        </div>
                    }
                </div>
                {/* Sidebar */}
                <aside className=" flex-none ">
                    <p className="text-2xl font-semibold mb-3">Tickets Summary</p>
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
                                    selectedSeat?.length <= 0 ? "--" : selectedSeat.join(',')
                                }</p>
                            </div>
                            <div className="flex  mt-4">
                                <p className="flex items-center gap-3 grow"> <FaRegMoneyBill1 /> Total Amount</p>
                                <p className="">{totalAmount ? `${totalAmount} BDT` : '--'}</p>
                            </div>
                        </div>
                        <form className="space-y-3 ">
                            <label >Ticket For</label>
                            <input type="text" className="input input-sm input-bordered input-primary w-full" placeholder="Full Name" />
                            <input type="text" className="input input-sm input-bordered input-primary w-full" placeholder="Phone Number" />
                            <button type="submit" className="btn btn-sm btn-primary w-full">Purchase Ticket</button>
                        </form>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TicketBookingPage;