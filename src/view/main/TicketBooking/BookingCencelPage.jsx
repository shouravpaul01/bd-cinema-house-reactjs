import { FaRegFaceSadCry } from 'react-icons/fa6';
import { Link } from "react-router-dom";

const BookingCencelPage = () => {
    return (
        <section className='my-container'>
            <div className='h-96 flex flex-col gap-3 items-center justify-center'>
                <FaRegFaceSadCry className='text-7xl text-red-600 animate-bounce' />
                <p className='font-semibold text-2xl'>Payment Unsuccessfull</p>
                <Link to={'/'} className='btn btn-sm btn-primary'>Go to Home</Link>
            </div>
        </section>
    );
};

export default BookingCencelPage;