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

const TicketBookingPage = () => {
    const [movies, setMovies] = useState(null)
    const [scheduleTime, setScheduleTime] = useState(null)
    const [seatTypesPrice, setSeatTypesPrice] = useState(null)
    const [selectSeatType, setSelectSeatType] = useState(null)
    const [totalTicket, setTotalTicket] = useState(0)
    const [seats, setSeats] = useState(Array(50).fill(false));
    const displayTime=useTimeCount(totalTicket)
    const [selectedSeat, setSelectedSeat] = useState([])


    const array2 = [{ id: 1, seat: 'A1' }, { id: 1, seat: 'C4' }]
    


    const handleMoviesByDate = useCallback((date) => {
        axiosInstance.get(`/show/active-movies-by-date?date=${date}`)
            .then(res => setMovies(res.data))
        setScheduleTime(null)
        setSeatTypesPrice(null)
        setSelectSeatType(null)
    }, [])
    const handleScheduleTime = useCallback((_id) => {

        axiosInstance.get(`/show/active-movie-by-id/${_id}`)
            .then(res => setScheduleTime(res.data))
        setSeatTypesPrice(null)
        setSelectSeatType(null)
    }, [])
    const handleSeatType = useCallback((showId, timeTypePriceId) => {
        axiosInstance.get(`/show/active-movie-seat-type-by-id/?showId=${showId}&timeTypePriceId=${timeTypePriceId}`)
            .then(res => setSeatTypesPrice(res.data.showTimesTypesPrice[0].seatTypesPrice))
        setSelectSeatType(null)
        setTotalTicket(0)
    }, [])
    const handleTotalTicketPlus = () => {
        if (totalTicket == 10) {
            return
        }
        
        setTotalTicket((prevCount) => prevCount + 1)
    }
    const handleTotalTicketMinus = () => {
        if (totalTicket == 0) {
            return
        }
        
        setTotalTicket((prevCount) => prevCount - 1)
    }
    const handleSeatBooking=(seat)=>{
        console.log(seat);
    }
    return (
        <div className="my-container my-24">
            <div className="flex flex-col md:flex-row gap-7  ">
                {/* Main Content */}
                <div className="flex-1 ">
                    <div className="mb-6">
                        <DateCard handleMoviesByDate={handleMoviesByDate} />

                    </div>
                    <div className="mb-9">
                        <MovieCard handleScheduleTime={handleScheduleTime} movies={movies} />
                    </div>

                    {scheduleTime && <div className="mb-9">
                        <ScheduleTimeCard showTimesTypesPrice={scheduleTime?.showTimesTypesPrice} handleSeatType={handleSeatType} scheduleTime={scheduleTime} />

                    </div>}

                    {
                        seatTypesPrice && <div className="mb-9 flex gap-7">
                            <div className="basis-3/5 ">
                                <SeatTypePriceCard seatTypesPrice={seatTypesPrice} setSelectSeatType={setSelectSeatType} selectSeatType={selectSeatType} />

                            </div>
                            {
                                selectSeatType && <div className="basis-2/5">
                                    <h3 className="text-2xl font-semibold  mb-3">Ticket Quantity</h3>

                                    <div className="flex items-center justify-center gap-5  bg-white rounded-md py-6">
                                        <button className="btn btn-sm" onClick={() => handleTotalTicketMinus()}><FaMinus /></button>
                                        <p><span className="text-lg font-bold">{totalTicket}   Tickets </span><br /><span className="text-xs">Mas 10 Tickets</span> </p>
                                        <button className="btn btn-sm btn-primary" onClick={() => handleTotalTicketPlus()}><FaPlus /></button>

                                    </div>

                                </div>
                            }

                        </div>
                    }
                   {
                    totalTicket >0 &&  <div >
                       
                    <div className=" border-b-2 pb-4 mb-6">
                    <div className="flex justify-between ">
                        <div className="border rounded-full flex items-center justify-center w-10 h-10  text-sm animate-pulse">
                           {displayTime.minutes +':'+ displayTime.seconds}
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
                                const matchedSeats = array2.find((element) => element.seat === seatLabel);
                                return (<li key={index + 1} className={`btn btn-sm  ${matchedSeats ? "btn-warning" : ""} `} onClick={()=>handleSeatBooking(seatLabel)}>{seatLabel}</li>)
                            })
                        }

                    </ul>
                </div>
                   }
                </div>
                {/* Sidebar */}
                <aside className=" flex-none ">
                    <p className="text-2xl font-semibold mb-3">Tickets Summary</p>
                    <div className="w-full md:w-80  bg-white rounded-lg p-4 ">
                        <div className="p-4">
                            <h1 className="text-2xl font-bold">Sidebar</h1>
                        </div>
                        <div className="my-4">
                            <div className="flex mt-4">
                                <p className="flex items-center gap-3 grow"> <FaCalendarDays /> Show Date</p>
                                <p className="">2-3-2</p>
                            </div>
                            <div className="flex  mt-4">
                                <p className="flex items-center gap-3 grow"> <FaCalendarDays /> Hall Name</p>
                                <p className="">2-3-2</p>
                            </div>
                            <div className="flex  mt-4">
                                <p className="flex items-center gap-3 grow"> <FaRegClock />Show Time</p>
                                <p className="">2-3-2</p>
                            </div>
                            <div className="flex  mt-4">
                                <p className="flex items-center gap-3 grow"> <FaChair />Seat Type</p>
                                <p className="">2-3-2</p>
                            </div>
                            <div className="flex mt-4">
                                <p className="flex items-center gap-3 grow"> <BsTicketDetailed /> Ticket Quantity</p>
                                <p className="">2-3-2</p>
                            </div>
                            <div className="flex  mt-4">
                                <p className="flex items-center gap-3 grow"> <FaChair />Selected Seat</p>
                                <p className="">2-3-2</p>
                            </div>
                            <div className="flex  mt-4">
                                <p className="flex items-center gap-3 grow"> <FaRegMoneyBill1 /> Total Amount</p>
                                <p className="">2-3-2</p>
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