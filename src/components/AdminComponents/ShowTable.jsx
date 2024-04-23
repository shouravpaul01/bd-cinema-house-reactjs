import { toast } from "react-toastify";
import axiosInstance from "../../../axiosConfig";
import { useState } from "react";
import Modal from "../CommonComponents/Modal";
import useAllMovieShow from "../../hooks/useAllMovieShow";
import { FaArrowRightArrowLeft, FaCircleInfo, FaPlus, FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import MovieShowTimes from "./MovieShowTimes";
import moment from 'moment-timezone';
import ShowDetails from "./ShowDetails";


const ShowTable = ({ moviesShow, mutate }) => {
    const [modalId, setModalId] = useState(null)
    const [details, setDetails] = useState(null)

    const handleStatus = (_id, status) => {
        axiosInstance.patch(`/show/update-status?_id=${_id}&status=${status}`)
            .then(res => {
                if (res.status == 200) {
                    toast.success(res.data.message);
                    mutate()
                }

            })
    }

    const handleDelete = (_id) => {
        axiosInstance.delete(`/show/${_id}`)
            .then(res => {
                if (res.status == 200) {
                    toast.success(res.data.message);
                    mutate()
                }
            })
    }

    const handleDetails = (_id) => {
        axiosInstance.get(`/show/details/${_id}`)
            .then(res => {
                document.getElementById(_id).showModal()
                setDetails(res.data)
            })
    }

    const handleCloseModal = () => {
        setDetails(null)
    }
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table bg-white">
                    {
                        moviesShow?.length == 0 && <caption className=" caption-bottom">
                            <div className='flex gap-2 items-center justify-center text-lg py-2'>
                                <FaCircleInfo />
                                <span className=''>Data not found.</span>
                            </div>

                        </caption>
                    }
                    {/* head */}
                    <thead className="bg-violet-300">
                        <tr className="text-sm">
                            <th></th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            moviesShow?.map((show, index) => <tr key={show._id}>
                                <th>{index + 1}</th>
                                <td>{show.movie?.name}</td>
                                <td>{moment(show.date).tz('Asia/Dhaka').format('DD-MMM-YYYY')}</td>
                                <td className="flex items-center gap-2">{show.showTimesTypesPrice.map((element, index) => <MovieShowTimes key={index + 1} element={element} index={index} showId={show._id} />)}
                                    <Link to={{
                                        pathname: `/dashboard/show/edit`,
                                        search: `?showId=${show._id}&date=${show.date}`
                                    }} className="btn btn-sm btn-circle btn-primary join-item"><FaPlus /></Link>
                                </td>

                                <td><button className={`btn btn-xs w-[100px]  uppercase ${show.status == 'active' ? 'btn-primary' : 'btn-error'}`} onClick={() => handleStatus(show._id, show.status == 'active' ? 'deactive' : 'active')}><FaArrowRightArrowLeft />{show.status}</button></td>
                                <td>
                                    <div className="flex gap-1">
                                        <button onClick={() => { handleDetails(show._id), setModalId(show._id) }} className="btn btn-sm btn-circle "><FaCircleInfo /></button>
                                        <button onClick={() => handleDelete(show._id)} className="btn btn-sm btn-circle btn-error " ><FaTrashCan /></button>

                                    </div></td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Modal width={'w-9/12 max-w-3xl'} modalId={modalId} handleCloseModal={handleCloseModal} modalTitle={'Movie Show Details'}>
                {details && <ShowDetails details={details} />}
            </Modal>
        </>

    );
};

export default ShowTable;