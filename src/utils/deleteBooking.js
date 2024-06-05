import axiosInstance from "../../axiosConfig";


const deleteBooking = (booking) => {
  return  axiosInstance.delete(`/booking?bookingId=${booking?._id}`)
                
};

export default deleteBooking;