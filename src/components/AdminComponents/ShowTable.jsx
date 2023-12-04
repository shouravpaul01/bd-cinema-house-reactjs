import { toast } from "react-toastify";
import axiosInstance from "../../../axiosConfig";
import { useState } from "react";
import Modal from "../CommonComponents/Modal";
import useAllMovieShow from "../../hooks/useAllMovieShow";
import { FaCircleInfo, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import MovieShowTimes from "./MovieShowTimes";


const ShowTable = () => {
    const { moviesShow, mutate } = useAllMovieShow()
    // console.log(moviesShow);
    const handleStatus = (_id, status) => {
        axiosInstance.patch(`/show/update-status?_id=${_id}&status=${status}`)
            .then(res => {
                if (res.data.code == 200) {
                    toast.success(res.data.message);
                    mutate()
                }

            })
    }

    const handleDelete = (_id) => {
        axiosInstance.delete(`/show/${_id}`)
            .then(res => {
                if (res.data.code == 200) {
                    toast.success(res.data.message);
                    mutate()
                }
            })
    }



    const handleDetails = (_id, status) => {
        console.log(status);
    }

    const handleModal = (_id) => {
        document.getElementById(_id).showModal()
    }
    return (
        <>
            <div className="overflow-y-visible">
                <table className="table table-xs">
                    {/* head */}
                    <thead>
                        <tr>
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
                                <td>{show.movie.name}</td>
                                <td>{show.date}</td>
                                <td className="flex gap-2">{show.showTimesTypesPrice.map((element, index) => <MovieShowTimes key={index + 1} element={element} index={index} showId={show._id} />)}

                                </td>
                                <td><button className="btn btn-xs btn-primary uppercase" onClick={() => handleStatus(show._id, show.status == 'deactive' ? 'active' : 'deactive')}>{show.status}</button></td>
                                <td>
                                    <div className="join">
                                        {show.showTimesTypesPrice.length == 0 && <Link to={{
                                            pathname: `/dashboard/show/edit`,
                                            search: `?showId=${show._id}`
                                        }} className="btn btn-xs btn-primary join-item"><FaPenToSquare /></Link>}
                                        <button onClick={() => handleDetails(show._id)} className="btn btn-xs join-item"><FaCircleInfo /></button>
                                        <button onClick={() => handleDelete(show._id)} className="btn btn-xs btn-warning join-item" ><FaTrashCan /></button>

                                    </div></td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {/* <Modal modalId={modalId} modalTitle={'Edit Movie'}>
                <AddandEditShowFrom editData={editData} mutate={mutate} />
            </Modal> */}
        </>
    );
};

export default ShowTable;