import { FaClapperboard, FaCubesStacked, FaPeopleGroup } from "react-icons/fa6";
import useAllMovies from "../../../hooks/useAllMovies";

const HomeDashboardPage = () => {
  const { movies } = useAllMovies();
  console.log(movies);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-5 md:px-0">
      <div className="bg-lime-200 rounded-md shadow-xl shadow-gray-300 p-4">
        <div className="flex items-center pb-2">
          <p className="grow font-bold text-lg">Total User</p>
          <span className="badge badge-secondary">5</span>
        </div>
        <span className="text-xl md:text-3xl">
          <FaPeopleGroup />{" "}
        </span>
      </div>
      <div className="bg-red-200 rounded-md shadow-xl shadow-gray-300 p-4">
        <div className="flex items-center pb-2">
          <p className="grow font-bold text-lg">Total Movies</p>
          <span className="badge badge-secondary">
            {movies?.data?.data.length}
          </span>
        </div>
        <span className="text-xl md:text-3xl">
          <FaClapperboard />
        </span>
      </div>
      <div className="bg-green-300 rounded-md shadow-xl shadow-gray-300 p-4">
        <div className="flex items-center pb-2">
          <p className="grow font-bold text-lg">Total Booking</p>
          <span className="badge badge-secondary">5</span>
        </div>
        <span className="text-xl md:text-3xl">
          <FaCubesStacked />
        </span>
      </div>
    </div>
  );
};

export default HomeDashboardPage;
