import React from "react";


const ScheduleTimeCard = ({ showTimesTypesPrice,handleSeatType,scheduleTime,selectedScheduleTime }) => {
    console.log('schedule time card');
    return (
        <>
            <h3 className="text-2xl font-semibold  mb-3">Select Show Time</h3>
            <div className="flex items-center bg-white rounded-md px-3 py-7">
                <p className="flex-1 text-xl font-semibold">Hall</p>
                <div className="flex gap-2" >
                    {
                        showTimesTypesPrice?.map(element => <div key={element._id} onClick={() => handleSeatType(scheduleTime._id, element._id,element.time.value)} className={`btn btn-sm ${selectedScheduleTime==element.time.value?'btn-primary':'btn-outline btn-primary'}`}>{element.time.value}</div>)
                    }
                </div>
            </div>
        </>
    );
};

export default React.memo(ScheduleTimeCard);