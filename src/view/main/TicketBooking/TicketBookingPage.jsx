import { FaCalendarDays, FaChair, FaRegClock, FaRegMoneyBill1 } from "react-icons/fa6";
import { BsTicketDetailed } from "react-icons/bs";
import axiosInstance from "../../../../axiosConfig";
import moment from "moment/moment";
import DateCard from "../../../components/MainComponents/DateCard";
import { useEffect, useState } from "react";
import useMoviesShowDate from "../../../hooks/useMoviesShowDate";
import MovieCard from "../../../components/MainComponents/MovieCard";

const TicketBookingPage = () => {
    const [movies, setMovies] = useState(null)
    const [scheduleTime, setScheduleTime] = useState(null)
    console.log(scheduleTime);


    const handleShowByDate = (date) => {
        axiosInstance.get(`/show/active-movies-by-date?date=${date}`)
            .then(res => setMovies(res.data))
    }
    const handleScheduleTime = (_id) => {
        console.log(_id);
        axiosInstance.get(`/show/active-movie-by-id/${_id}`)
            .then(res => setScheduleTime(res.data))
    }
    return (
        <div className="my-container my-24">
            <div className="flex flex-col md:flex-row gap-7">
                {/* Main Content */}
                <div className="flex-1 ">
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold  mb-3">Select Date</h3>
                        <div className="flex gap-3">
                            <DateCard handleShowByDate={handleShowByDate} />
                        </div>
                    </div>
                    <div className="mb-9">
                        <h3 className="text-2xl font-semibold  mb-3">Select Movie ({movies?.length})</h3>
                        <div className="flex gap-3">
                            <MovieCard handleScheduleTime={handleScheduleTime} movies={movies} />
                        </div>

                    </div>

                    {scheduleTime && <div>
                        <h3 className="text-2xl font-semibold  mb-3">Select Show Time</h3>
                        <div className="flex items-center bg-white rounded-md px-3 py-7">
                            <p className="flex-1 text-xl font-semibold">Hall</p>
                            <div className="flex gap-2" >
                                {
                                    scheduleTime?.showTimesTypesPrice?.map(element => <div key={element._id} className="border rounded-md px-4 py-1">{element.time.value}</div>)
                                }
                            </div>
                        </div>
                    </div>}
                </div>
                {/* Sidebar */}
                <aside className="flex-none ">
                    <p className="text-2xl font-semibold mb-3">Tickets Summary</p>
                    <div className="w-full md:w-80  bg-white rounded-lg p-4">
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