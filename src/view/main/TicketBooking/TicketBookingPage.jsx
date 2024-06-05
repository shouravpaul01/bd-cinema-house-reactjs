import { FaMinus, FaPlus } from "react-icons/fa6";
import axiosInstance from "../../../../axiosConfig";
import DateCard from "../../../components/MainComponents/DateCard";
import { useCallback, useEffect, useState } from "react";
import MovieCard from "../../../components/MainComponents/MovieCard";
import ScheduleTimeCard from "../../../components/MainComponents/ScheduleTimeCard";
import SeatTypePriceCard from "../../../components/MainComponents/SeatTypePriceCard";
import useTimeCount from "../../../hooks/useTimeCount";
import { toast } from "react-toastify";
import deleteBooking from "../../../utils/deleteBooking";
import TicketBookingSideBar from "../../../components/MainComponents/TicketBookingSideBar";
import bookedSeatApi from "../../../utils/bookedSeatApi";
import useAuth from "../../../hooks/useAuth";
import useMoviesShowDate from "../../../hooks/useMoviesShowDate";
import useTitle from "../../../hooks/useTitle";

const TicketBookingPage = () => {
  useTitle("Ticket");
  const { user } = useAuth();
  const { moviesShowDate } = useMoviesShowDate();
  const [movies, setMovies] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null);
  const [selectedScheduleTime, setSelectedScheduleTime] = useState(null);
  const [seatTypesPrice, setSeatTypesPrice] = useState(null);
  const [selectedSeatType, setSelectedSeatType] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [seats, setSeats] = useState(Array(50).fill(false));
  const { displayTime, time } = useTimeCount(ticketQuantity);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [bookedSeat, setBookedSeat] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (ticketQuantity >= 0) {
      setTotalAmount(ticketQuantity * selectedSeatType?.price);
    }
    if (time <= 0) {
      deleteBooking(booking).then((res) => {
        setBooking(null);
        setSelectedSeat([]);
        bookedSeatApi(
          selectedMovie,
          selectedDate,
          selectedScheduleTime,
          selectedSeatType
        ).then((res) => {
          console.log(res, "bookSeat1");
          setBookedSeat(res?.data?.data);
        });
      });
    }
  }, [ticketQuantity, time]);

  useEffect(() => {
    if (
      selectedMovie &&
      selectedDate &&
      selectedScheduleTime &&
      selectedSeatType
    ) {
      bookedSeatApi(
        selectedMovie,
        selectedDate,
        selectedScheduleTime,
        selectedSeatType
      ).then((res) => {
        setBookedSeat(res?.data?.data);
      });
    }
  }, [selectedMovie, selectedDate, selectedScheduleTime, selectedSeatType]);

  const handleMoviesByDate = useCallback((date) => {
    setSelectedDate(date);
    axiosInstance
      .get(`/showtimes/active-movies-by-date?date=${date}`)
      .then((res) => setMovies(res.data));
    setScheduleTime(null);
    setSelectedScheduleTime(null);
    setSelectedMovie(null);
    setSeatTypesPrice(null);
    setSelectedSeatType(null);
    setBookedSeat(null);
    setTicketQuantity(0);
  }, []);
  const handleScheduleTime = useCallback((_id) => {
    axiosInstance
      .get(`/showtimes/active-movie-by-id/${_id}`)
      .then((res) => setScheduleTime(res.data));

    setSelectedScheduleTime(null);
    setSeatTypesPrice(null);
    setSelectedSeatType(null);
    setTotalAmount(null);
    setBookedSeat(null);
    setTicketQuantity(0);
  }, []);
  const handleSeatType = useCallback(
    (showId, timeTypePriceId, showTime) => {
      setSelectedScheduleTime(showTime);
      axiosInstance
        .get(
          `/showtimes/active-movie-seat-type-by-id/?showId=${showId}&timeTypePriceId=${timeTypePriceId}`
        )
        .then((res) => {
          setSeatTypesPrice(
            res.data?.data?.showTimesTypesPrice[0].seatTypesPrice
          );
        });
      setSelectedSeatType(null);
      setTicketQuantity(0);
      setTotalAmount(null);
      setBookedSeat(null);
    },
    [ticketQuantity]
  );

  const handleticketQuantityPlus = () => {
    if (ticketQuantity == 10) {
      return;
    }
    setTicketQuantity((prevCount) => prevCount + 1);
    handleDeleteBooking();
    setSelectedSeat([]);
  };
  const handleticketQuantityMinus = () => {
    if (ticketQuantity == 0) {
      setTotalAmount(null);
      return;
    }

    setTicketQuantity((prevCount) => prevCount - 1);
    handleDeleteBooking();
    setSelectedSeat([]);
  };

  const handleSeatBooking = useCallback(
    (seat) => {
      const newSeat = [seat, ...selectedSeat];
      const data = {
        date: selectedDate,
        time: selectedScheduleTime,
        seatType: selectedSeatType.seatType,
        seat: newSeat,
        totalAmount: totalAmount,
        movie: selectedMovie?._id,
        email: user.email,
      };

      const matchedSeat = selectedSeat.filter((element) => element == seat);

      if (matchedSeat.length > 0) {
        if (booking) {
          console.log(matchedSeat, "matchedSeat2");
          handleDeleteBooking(seat);
        }
        return;
      }
      if (ticketQuantity == selectedSeat.length) {
        toast.error("You selected max amount of ticket");
        return;
      }
      if (booking && selectedSeat.length >= 0) {
        axiosInstance.patch(`/booking/${booking?._id}`, data).then((res) => {
          setBooking(res?.data?.data);
        });

        setSelectedSeat(newSeat);
        return;
      }
      if (!booking) {
        console.log("3");
        axiosInstance.post("/booking/create-booking", data).then((res) => {
          console.log(res, "ee2");
          setBooking(res.data?.data);
          setSelectedSeat(newSeat);
        });
      }
    },
    [ticketQuantity, selectedSeat, totalAmount, booking]
  );

  const handleDeleteBooking = (seat) => {
    //A seat deleted to selected multiple seats
    if (booking && seat) {
      // const deleteSeat = selectedSeat.filter((element) => element !== seat);
      axiosInstance
        .delete(`/booking?bookingId=${booking?._id}&seat=${seat}`)
        .then((res) => {
          setBooking(res.data?.data);
          setSelectedSeat(res.data.data?.seat);
          console.log(res, "delete");
        });
    }
    //Booking deleted
    if (booking && !seat) {
      deleteBooking(booking).then((res) => {
        setBooking(null);
        setSelectedSeat([]);
      });
    }
  };

  return (
    <div className="my-container py-24">
      <div className="flex flex-col md:flex-row gap-7  ">
        {/* Main Content */}
        <div className="flex-1 ">
          <div className="mb-6">
            <DateCard
              moviesShowDate={moviesShowDate?.data}
              handleMoviesByDate={handleMoviesByDate}
            />
          </div>
          <div className="mb-9">
            <MovieCard
              handleScheduleTime={handleScheduleTime}
              movies={movies?.data}
              setSelectedMovie={setSelectedMovie}
              selectedMovie={selectedMovie}
            />
          </div>

          {scheduleTime && (
            <div className="mb-9">
              <ScheduleTimeCard
                showTimesTypesPrice={scheduleTime?.data?.showTimesTypesPrice}
                handleSeatType={handleSeatType}
                scheduleTime={scheduleTime?.data}
                selectedScheduleTime={selectedScheduleTime}
              />
            </div>
          )}

          {seatTypesPrice && (
            <div className="mb-9 flex flex-col md:flex-row gap-7">
              <div className="basis-3/5 ">
                <SeatTypePriceCard
                  seatTypesPrice={seatTypesPrice}
                  setSelectedSeatType={setSelectedSeatType}
                  selectedSeatType={selectedSeatType}
                  setTotalAmount={setTotalAmount}
                  setTicketQuantity={setTicketQuantity}
                />
              </div>
              {selectedSeatType && (
                <div className="basis-2/5">
                  <h3 className="text-2xl font-semibold  mb-3">
                    Ticket Quantity
                  </h3>

                  <div className="flex items-center justify-center gap-5  bg-white rounded-md py-6">
                    <button
                      className="btn btn-sm"
                      onClick={() => handleticketQuantityMinus()}
                    >
                      <FaMinus />
                    </button>
                    <p>
                      <span className="text-lg font-bold">
                        {ticketQuantity} Tickets{" "}
                      </span>
                      <br />
                      <span className="text-xs">Mas 10 Tickets</span>{" "}
                    </p>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleticketQuantityPlus()}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {ticketQuantity > 0 && (
            <div className="bg-white outline-dashed outline-1 outline-violet-900 p-4 md:p-6 rounded-md ">
              <div className=" overflow-x-auto">
                <div className="text-xs border-b-2 pb-4 mb-6">
                  <div className="flex justify-between ">
                    <div
                      className={`border ${
                        time <= 60
                          ? "border-red-500 animate-pulse text-red-500"
                          : ""
                      } rounded-full flex items-center justify-center w-10 h-10  text-sm `}
                    >
                      {displayTime.minutes + ":" + displayTime.seconds}
                    </div>
                    <div className="flex gap-4 text-sm font-semibold">
                      <div className="flex items-center gap-1">
                        <span className="w-6 h-5 md:w-9 md:h-6 rounded border border-green-500"></span>
                        Available
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-6 h-5 md:w-9 md:h-6 rounded bg-yellow-500"></span>
                        Selected
                      </div>
                      <div className="flex  items-center gap-1">
                        <span className="w-6 h-5 md:w-9 md:h-6 rounded bg-slate-100"></span>
                        Not Available
                      </div>
                    </div>
                  </div>
                </div>

                <ul className=" grid grid-cols-10 gap-2">
                  {seats.map((seat, index) => {
                    const rowLabel = String.fromCharCode(
                      "A".charCodeAt(0) + Math.floor(index / 10)
                    );
                    const seatNumber = (index % 10) + 1;
                    const seatLabel = `${rowLabel}${seatNumber}`;
                    const matchedSeats = selectedSeat?.find(
                      (element) => element === seatLabel
                    );
                    const matchbookedSeat = bookedSeat?.find(
                      (element) => element === seatLabel
                    );
                    return (
                      <li
                        key={index + 1}
                        className={` btn btn-sm  ${
                          matchedSeats
                            ? "btn-warning"
                            : "btn-outline btn-success"
                        } `}
                        onClick={() => handleSeatBooking(seatLabel)}
                        disabled={matchbookedSeat}
                      >
                        {seatLabel}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
        {/* Sidebar */}
        <aside className=" flex-none ">
          <p className="text-2xl font-semibold mb-3">Tickets Summary</p>
          <TicketBookingSideBar
            selectedDate={selectedDate}
            selectedMovie={selectedMovie}
            selectedScheduleTime={selectedScheduleTime}
            selectedSeatType={selectedSeatType}
            ticketQuantity={ticketQuantity}
            selectedSeat={selectedSeat}
            totalAmount={totalAmount}
            bookingId={booking?._id}
          />
        </aside>
      </div>
    </div>
  );
};

export default TicketBookingPage;
