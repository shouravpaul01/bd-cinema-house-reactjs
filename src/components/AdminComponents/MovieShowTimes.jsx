import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import useAllMovieShow from "../../hooks/useAllMovieShow";
import { toast } from "react-toastify";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";

<<<<<<< HEAD
const MovieShowTimes = ({ showId, element, index, softDeletedData }) => {
  const { mutate } = useAllMovieShow();

  // const handleDelete = (showId, timeTypePriceId) => {
  //   axiosInstance
  //     .delete(
  //       `/show/show-time-type-price?showId=${showId}&timeTypePriceId=${timeTypePriceId}`
  //     )
  //     .then((res) => {
  //       if (res.status == 200) {
  //         toast.success(res?.data?.message);
  //         mutate();
  //       }
  //     });
  // };
  return (
    <>
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={index}
          role="button"
          className="btn btn-sm btn-outline btn-primary rounded-full m-1"
        >
          {element.time}
        </div>
        {!softDeletedData && (
          <div
            tabIndex={index}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box border border-violet-300 w-52"
          >
            <div className="px-4 flex justify-between  border-b border-violet-300">
              {element?.seatTypesPrice?.map((price, index) => (
                <p key={index} className="font-semibold">
                  {price?.seatType == "regular"
                    ? `R:${price.price}TK`
                    : `P:${price.price}TK`}
                </p>
              ))}
            </div>
            <ul className="menu ">
              <li>
                <Link
                  to={{
                    pathname: "/dashboard/show/edit",
                    search: `?showId=${showId}&timeTypePriceId=${element._id}`,
                  }}
                >
                  <FaPenToSquare /> Edit
                </Link>
              </li>
              {/* <li>
          <Link onClick={() => handleDelete(showId, element._id)}>
            <FaTrashCan /> Delete
          </Link>
        </li> */}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieShowTimes;
=======

const MovieShowTimes = ({ showId, element, index }) => {
    const { mutate } = useAllMovieShow()
    
    const handleDelete = (showId, timeTypePriceId) => {
        axiosInstance.delete(`/show/show-time-type-price?showId=${showId}&timeTypePriceId=${timeTypePriceId}`)
            .then(res => {
                if (res.data.code == 200) {
                    toast.success(res.data.message);
                    mutate()
                }
            })
    }
    return (
        <div className="dropdown dropdown-hover">
            <div tabIndex={index} role="button" className="btn btn-sm btn-outline btn-primary rounded-full m-1">{element.time.value}</div>
           <div tabIndex={index} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box border border-violet-300 w-52">
            <div className="px-4 flex justify-between  border-b border-violet-300">
                {
                    element?.seatTypesPrice?.map((price,index)=><p key={index} className="font-semibold">
                        {
                            price?.seatType == 'regular'?`R:${price.price}TK`:`P:${price.price}TK`
                        }
                    </p>)
                }
            </div>
           <ul  className="menu ">
                <li><Link to={{
                    pathname:'/dashboard/show/edit',
                    search:`?showId=${showId}&timeTypePriceId=${element._id}`
                }}><FaPenToSquare /> Edit</Link></li>
                <li><Link onClick={() => handleDelete(showId, element._id)}><FaTrashCan /> Delete</Link></li>
            </ul>
           </div>
        </div>
    );
};


export default MovieShowTimes;
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
