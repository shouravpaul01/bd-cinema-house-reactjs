import { useEffect, useState } from "react";
import deleteBooking from "../utils/deleteBooking";


const useTimeCount = (ticketQuantity,booking) => {
  const [time, setTime] = useState(0); // Convert minutes to seconds
  const [displayTime, setDisplayTime] = useState({ minutes: 0, seconds: 0 });
  //console.log(time);
  useEffect(() => {
    if (ticketQuantity > 0) {
      const intervalId = setInterval(() => {
        // Update the time every secondgit show-branch -r
        setTime(prevTime => prevTime - 1);

        // Calculate minutes and seconds from the remaining time
        const newMinutes = Math.floor(time / 60);
        const newSeconds = time % 60;

        // Update the displayTime state
        setDisplayTime({ minutes: newMinutes, seconds: newSeconds });

        // Check if the countdown has reached zero
        if (time <= 0) {
          console.log('hh');
          clearInterval(intervalId);
          setTime(2 * 60)
          
          // Perform any action when the countdown reaches zero
          // For example, display a message or trigger a function
        }
      }, 1000);
      // Cleanup the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }

    if (ticketQuantity == 0) {
      setTime(2 * 60)
    }

  }, [time, ticketQuantity]);
  return {displayTime,time}
};

export default useTimeCount;