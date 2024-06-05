<<<<<<< HEAD
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
=======
import axiosInstance from '../../axiosConfig';

const bookedSeatApi = (selectedMovie,selectedDate,selectedScheduleTime,selectedSeatType) => {
    return axiosInstance.get(`/booking/match-by?movie=${selectedMovie?._id}&date=${selectedDate}&time=${selectedScheduleTime}&seatType=${selectedSeatType?.seatType}`)
};

export default bookedSeatApi;
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
