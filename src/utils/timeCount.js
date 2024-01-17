import { useEffect } from "react";


// const timeCount = (time, totalTicket, setTime, setDisplayTime) => {

    const timeCount = setInterval((time, totalTicket, setTime, setDisplayTime) => {
        console.log('ki', time);
        // Update the time every second
        setTime(prevTime => prevTime - 1);

        // Calculate minutes and seconds from the remaining time
        const newMinutes = Math.floor(time / 60);
        const newSeconds = time % 60;

        // Update the displayTime state
        setDisplayTime({ minutes: newMinutes, seconds: newSeconds });

        // Check if the countdown has reached zero
        if (time <= 0) {
            console.log('hh');
            clearInterval(timeCount);
            setTime(2 * 60)
            // Perform any action when the countdown reaches zero
            // For example, display a message or trigger a function
        }
    }, 1000);
    // Cleanup the interval when the component is unmounted
    // return () => clearInterval(intervalId);



// };

export default timeCount;