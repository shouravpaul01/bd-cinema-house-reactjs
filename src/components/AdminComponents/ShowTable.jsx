import { toast } from "react-toastify";
import axiosInstance from "../../../axiosConfig";
import { useState } from "react";
import Modal from "../CommonComponents/Modal";
import useAllMovieShow from "../../hooks/useAllMovieShow";
import { FaCircleInfo, FaPenToSquare, FaPlus, FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import MovieShowTimes from "./MovieShowTimes";
import moment from "moment/moment";


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
        <section className="my-container pt-10 ">
            <div className="overflow-x-auto">
                <table className="table ">
                    {/* head */}
                    <thead>
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
                                <td>{moment(show.date).format('DD-MMM-YYYY')}</td>
                                <td className="flex items-center gap-2">{show.showTimesTypesPrice.map((element, index) => <MovieShowTimes key={index + 1} element={element} index={index} showId={show._id} />)}
                                    <Link to={{
                                        pathname: `/dashboard/show/edit`,
                                        search: `?showId=${show._id}&date=${show.date}`
                                    }} className="btn btn-sm btn-circle btn-primary join-item"><FaPlus /></Link>
                                </td>
                                <td><button className={`btn btn-xs  uppercase ${show.status == 'active' ? 'btn-primary' : 'btn-error'}`} onClick={() => handleStatus(show._id, show.status == 'active' ? 'deactive' : 'active')}>{show.status == 'active' ? 'active' : 'deactive'}</button></td>
                                <td>
                                    <div className="flex gap-1">
                                        <Link to={{
                                            pathname: `/dashboard/show/edit`,
                                            search: `?showId=${show._id}&date=${show.date}`
                                        }} className="btn btn-sm btn-circle btn-primary join-item"><FaPlus /></Link>
                                        <button onClick={() => handleDetails(show._id)} className="btn btn-sm btn-circle "><FaCircleInfo /></button>
                                        <button onClick={() => handleDelete(show._id)} className="btn btn-sm btn-circle btn-error " ><FaTrashCan /></button>

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
        </section>
    );
};

export default ShowTable;