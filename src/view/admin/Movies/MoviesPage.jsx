import { useState } from "react";
import MoviesTable from "../../../components/AdminComponents/MoviesTable";
import Pagination from "../../../components/CommonComponents/Pagination";
import useAllMovies from "../../../hooks/useAllMovies";
import InputSearch from "../../../components/CommonComponents/InputSearch";
import Loading from "../../../components/CommonComponents/Loading";
<<<<<<< HEAD
import { FaPlus, FaXmark, FaTrashCan } from "react-icons/fa6";
import { RiMovie2Fill } from "react-icons/ri";
import AddandEditMovieForm from "../../../components/AdminComponents/AddandEditMovieForm";

const MoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [contentHide, setContentHide] = useState(false);
  const [softDeletedData, setSoftDeletedData] = useState(false);
  const { movies, mutate, isLoading } = useAllMovies(
    currentPage,
    searchValue,
    softDeletedData
  );

  return (
    <section>
      {contentHide && (
        <div className="bg-gray-100 ">
          <div className="flex items-center bg-violet-700 py-2 px-4">
            <p className="font-bold text-white flex-1">Add Movie</p>
            <button
              onClick={() => setContentHide(!contentHide)}
              className={`btn btn-sm btn-circle  ${
                contentHide ? "btn-error" : "btn-info"
              }`}
            >
              {contentHide ? <FaXmark /> : <FaPlus />}{" "}
            </button>
          </div>

          <div className=" transition duration-500 ">
            <AddandEditMovieForm mutate={mutate} />
          </div>
        </div>
      )}
      <div className="bg-gray-100 mt-4">
        <div className="flex items-center bg-violet-700 gap-2 py-2 px-4">
          <p className="font-bold text-white flex-1">All Movies</p>
          <button
            onClick={() => setContentHide(!contentHide)}
            className={`btn btn-sm btn-circle ${
              contentHide ? "btn-error" : " btn-info"
            }`}
          >
            {contentHide ? <FaXmark /> : <FaPlus />}{" "}
          </button>
          <button
            onClick={() => setSoftDeletedData(!softDeletedData)}
            className="btn btn-sm text-white btn-outline btn-warning"
          >
            {softDeletedData === false ? <FaTrashCan /> : <RiMovie2Fill />}
            {softDeletedData === false ? "Trash" : "Movies"}
          </button>
        </div>
        <div className="px-4 py-5">
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
            <div className="w-full md:w-80">
              <InputSearch
                setSearchValue={setSearchValue}
                classNameSearch={
                  " border border-violet-400 rounded-full py-1   focus:outline-violet-600 "
                }
                classNameSearchBtn={"rounded-e-full  p-1 text-violet-600"}
              />
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <MoviesTable
              movies={movies?.data?.data}
              softDeletedData={softDeletedData}
              mutate={mutate}
              isMoviesLoading={isLoading}
            />
          )}

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={movies?.data?.totalPages}
          />
        </div>
      </div>
    </section>
  );
};

export default MoviesPage;
=======
import { FaPlus, FaXmark } from "react-icons/fa6";
import AddandEditMovieForm from "../../../components/AdminComponents/AddandEditMovieForm";



const MoviesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [contentHide, setContentHide] = useState(false)
    const { movies, mutate, isLoading } = useAllMovies(currentPage, searchValue)


    return (
        <section >
            {
                contentHide && <div className="bg-gray-100 ">
                    <div className='flex items-center bg-violet-700 py-2 px-4'>

                        <p className="font-bold text-white flex-1">Add Movie</p>
                        <button onClick={() => setContentHide(!contentHide)} className={`btn btn-sm btn-circle  ${contentHide ? 'btn-error' : 'btn-info'}`}>{contentHide ? <FaXmark /> : <FaPlus />} </button>
                    </div>

                    <div className=' transition duration-500 '>
                        <AddandEditMovieForm mutate={mutate} />
                    </div>



                </div>
            }
            <div className="bg-gray-100 mt-4">
                <div className='flex items-center bg-violet-700 py-2 px-4'>

                    <p className="font-bold text-white flex-1">All Movies</p>
                    <button onClick={() => setContentHide(!contentHide)} className={`btn btn-sm btn-circle ${contentHide ? 'btn-error' : ' btn-info'}`}>{contentHide ? <FaXmark /> : <FaPlus />} </button>
                </div>
                <div className="px-4 py-5">



                    <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
                        <div className="w-full md:w-80">
                            <InputSearch setSearchValue={setSearchValue} classNameSearch={' border border-violet-400 rounded-full py-1   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'} />
                        </div>

                    </div>
                    {
                        isLoading ? <Loading /> : <MoviesTable movies={movies?.data} mutate={mutate} isMoviesLoading={isLoading} />
                    }


                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={movies?.totalPages} />



                </div>
            </div>
        </section>
        
    );
};

export default MoviesPage;
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
