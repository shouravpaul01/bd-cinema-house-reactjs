import movieImg from "/movie.svg";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative ">
        <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-dotted border-violet-800 rounded-full animate-spin p-4"></div>
        <img
          src={movieImg}
          className="w-14 md:w-16 absolute top-3 left-3 md:left-4 opacity-85"
          alt="ju-logo"
        />
      </div>
    </div>
  );
};

export default Loading;
