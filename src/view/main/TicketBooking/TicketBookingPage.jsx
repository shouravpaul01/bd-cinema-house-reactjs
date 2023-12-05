import { FaCalendarDays, FaChair, FaRegClock, FaRegMoneyBill1 } from "react-icons/fa6";
import { BsTicketDetailed } from "react-icons/bs";


const TicketBookingPage = () => {
    return (
        <div className="my-container my-24">
            <div className="flex">
                {/* Main Content */}
                <div className="flex-1 ">
                    <h1 className="text-2xl font-bold">Main Content</h1>
                    {/* Your main content goes here */}
                </div>
                {/* Sidebar */}
                <aside className="flex-none w-80  bg-gray-800 text-white rounded-lg p-4">
                    <div className="p-4">
                        <h1 className="text-2xl font-bold">Sidebar</h1>
                    </div>
                    <div className="mt-4">
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
                </aside>
            </div>
        </div>
    );
};

export default TicketBookingPage;