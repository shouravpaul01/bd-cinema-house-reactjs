import React from "react";


const SeatTypePriceCard = ({ seatTypesPrice,setSelectSeatType ,selectSeatType}) => {
    console.log("seattype price card");
   
    return (
        <>
            <h3 className="text-2xl font-semibold  mb-3">Select Seat Type</h3>

            <div className="flex gap-8 bg-white rounded-md px-3 py-7">
                {
                    seatTypesPrice?.map((seatTypePrice, index) => <div key={index+1} className="flex items-center gap-3">
                    <input type="radio" value={seatTypePrice?.seatType} onChange={(event)=>setSelectSeatType(event.target.value)} checked={selectSeatType===seatTypePrice?.seatType?true:false} name="radio-2"  className="radio radio-primary" />
                    <div>
                        <p>{seatTypePrice?.seatType}</p>
                        <p>BDT  {seatTypePrice?.price} ৳</p>
                    </div>
                </div>)
                }

            </div>

        </>
    );
};

export default React.memo(SeatTypePriceCard);