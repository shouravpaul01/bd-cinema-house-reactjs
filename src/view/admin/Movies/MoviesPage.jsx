import { useState } from "react";
import AddandEditFrom from "../../../components/AdminComponents/AddandEditFrom";
import Heading from "../../../components/AdminComponents/Heading";
import MoviesTable from "../../../components/AdminComponents/MoviesTable";
import Pagination from "../../../components/CommonComponents/Pagination";
import useAllMovies from "../../../hooks/useAllMovies";
import SearchInput from "../../../components/CommonComponents/SearchInput";



const MoviesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const { movies, mutate,isMoviesLoading } = useAllMovies(currentPage,searchValue)

   
    return (
        <>
            <Heading title={'Add Movie'} btnName={'add'} hrefUrl={'/dashboard/movie/add'} />
            <div className="py-4">
                <div className="w-full md:w-80">
                <SearchInput setSearchValue={setSearchValue}/>
                </div>
                <MoviesTable movies={movies?.data} mutate={mutate} isMoviesLoading={isMoviesLoading}/>
                <div className=" mt-3">
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={movies?.totalPages} />
                </div>
            </div>
        </>
    );
};

export default MoviesPage;