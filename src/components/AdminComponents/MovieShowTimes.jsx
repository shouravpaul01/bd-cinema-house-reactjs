import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import useAllMovieShow from "../../hooks/useAllMovieShow";
import { toast } from "react-toastify";


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
            <ul tabIndex={index} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to={{
                    pathname:'/dashboard/show/edit',
                    search:`?showId=${showId}&timeTypePriceId=${element._id}`
                }}>Edit</Link></li>
                <li><Link onClick={() => handleDelete(showId, element._id)}>Delete</Link></li>
            </ul>
        </div>
    );
};


export default MovieShowTimes;