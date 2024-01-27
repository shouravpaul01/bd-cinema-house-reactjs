import { useState } from "react";
import Heading from "../../../components/AdminComponents/Heading";
import ShowTable from "../../../components/AdminComponents/ShowTable";
import Pagination from "../../../components/CommonComponents/Pagination";
import useAllMovieShow from "../../../hooks/useAllMovieShow";


const ShowsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { moviesShow, mutate } = useAllMovieShow(currentPage)
    console.log(moviesShow);
    return (
        <>
            <Heading title={'Add Movie Shows'} btnName={'add'} hrefUrl={'/dashboard/show/add'} />
            <ShowTable moviesShow={moviesShow?.data} mutate={mutate} />
            <section className=" mt-3">
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={moviesShow?.totalPages} />
            </section>
        </>
    );
};

export default ShowsPage;