import axiosInstance from "../../axiosConfig";

const bookedSeatApi = (
  selectedMovie,
  selectedDate,
  selectedScheduleTime,
  selectedSeatType
) => {
  return axiosInstance.get(
    `/booking/match-by?movie=${selectedMovie?._id}&date=${selectedDate}&time=${selectedScheduleTime}&seatType=${selectedSeatType?.seatType}`
  );
};

export default bookedSeatApi;
