import generateTotalPaginatePages from "../../utils/generateTotalPaginatePages";
<<<<<<< HEAD
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  if (totalPages == 0) {
    return;
  }
  return (
    <div className="flex gap-3 p-2">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className="btn btn-sm btn-circle btn-primary"
        disabled={currentPage === 1}
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
      <ul className="flex gap-2">
        {generateTotalPaginatePages(totalPages)?.map((pageNo, index) => (
          <li
            key={index + 1}
            className={`btn btn-sm btn-circle ${
              currentPage == pageNo ? "btn-primary" : "btn-outline btn-primary"
            } `}
            onClick={() => {
              setCurrentPage(pageNo);
            }}
          >
            {pageNo}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className="btn btn-sm btn-circle btn-primary"
        disabled={currentPage === totalPages}
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
=======
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";


const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    console.log(totalPages,'total');
    if (totalPages==0) {
        return
    }
    return (
        <div className="flex gap-3 p-2">
            <button onClick={() => setCurrentPage(currentPage - 1)} className="btn btn-sm btn-circle btn-primary" disabled={currentPage === 1}><MdKeyboardDoubleArrowLeft /></button>
            <ul className="flex gap-2">
                {

                    generateTotalPaginatePages(totalPages)?.map((pageNo, index) => <li key={index + 1} className={`btn btn-sm btn-circle ${currentPage==pageNo?"btn-primary":"btn-outline btn-primary"} `} onClick={()=>{setCurrentPage(pageNo)}} >{pageNo}</li>)
                }

            </ul>
            <button onClick={() => setCurrentPage(currentPage + 1)} className="btn btn-sm btn-circle btn-primary" disabled={currentPage === totalPages}><MdKeyboardDoubleArrowRight /></button>
        </div>
    );
};

export default Pagination;
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
