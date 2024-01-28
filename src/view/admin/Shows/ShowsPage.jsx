import { useState } from "react";
import Heading from "../../../components/AdminComponents/Heading";
import ShowTable from "../../../components/AdminComponents/ShowTable";
import Pagination from "../../../components/CommonComponents/Pagination";
import useAllMovieShow from "../../../hooks/useAllMovieShow";
import SearchInput from "../../../components/CommonComponents/SearchInput";

const ShowsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const { moviesShow, mutate, isShowLoading } = useAllMovieShow(currentPage, searchValue)
    console.log(searchValue);

    return (
        <>
            <Heading title={'Add Movie Shows'} btnName={'add'} hrefUrl={'/dashboard/show/add'} />
            <div className="py-4">
                <div className="w-full md:w-80">
                    <SearchInput setSearchValue={setSearchValue} />
                </div>
                <ShowTable moviesShow={moviesShow?.data} mutate={mutate} isShowLoading={isShowLoading} />
                <div className=" mt-3">
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={moviesShow?.totalPages} />
                </div>
            </div>

        </>
    );
};

export default ShowsPage;