import movieImg from '../../../public/movie.svg';

const Loading = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <div className='relative '>
                <div className='w-20 h-20 md:w-24 md:h-24 border-2 border-dotted border-violet-800 rounded-full animate-spin p-4'>
                </div>
                <img src={movieImg} className='w-14 md:w-16 absolute top-3 left-3 md:left-4 opacity-85' alt="ju-logo" />
            </div>
            <div className='flex items-center justify-center'>
                <span className="loading loading-ball loading-xs text-primary"></span>
                <span className="loading loading-ball loading-sm text-secondary" ></span>
                <span className="loading loading-ball loading-md text-warning "></span>
                <span className="loading loading-ball loading-lg text-error"></span>
            </div>
        </div>
    );
};

export default Loading;