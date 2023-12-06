import axiosInstance from "../../../axiosConfig";
import { FaCircleInfo, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Modal from "../CommonComponents/Modal";
import AddandEditFrom from "./AddandEditFrom";
import useAllMovies from "../../hooks/useAllMovies";
import { Link } from "react-router-dom";


const MoviesTable = () => {
    const { movies, mutate } = useAllMovies()
    const [modalId, setModalId] = useState(null)
    const [editData, setEditData] = useState(null)
    // console.log(editData);
    const handleStatus = (_id, status) => {
        axiosInstance.patch(`/movie/update-status?_id=${_id}&status=${status}`)
            .then(res => {
                if (res.data.code == 200) {
                    toast.success(res.data.message);
                    mutate()
                }

            })
    }

    const handleDelete = (_id) => {
        axiosInstance.delete(`/movie/${_id}`)
            .then(res => {
                if (res.data.code == 200) {
                    toast.success(res.data.message);
                    mutate()
                }
            })
    }

    const handleEdit = (_id) => {
        axiosInstance.get(`/movie/edit-data/${_id}`)
            .then(res => {
                setEditData(res.data)
                handleModal(_id)
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
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies?.map((movie, index) => <tr key={movie._id}>
                                <th>{index + 1}</th>
                                <td>{movie.name}</td>
                                <td>{movie.duration}</td>
                                <td><button className="btn btn-xs btn-primary uppercase" onClick={() => handleStatus(movie._id, movie.status == 'deactive' ? 'active' : 'deactive')}>{movie.status}</button></td>
                                <td>
                                    <div className="flex gap-2">
                                        <Link to={`?_id=${movie._id}`} onClick={() => { handleEdit(movie._id), setModalId(movie._id) }} className="btn btn-xs btn-circle btn-primary "><FaPenToSquare /></Link>
                                        <button onClick={() => handleDetails(movie._id)} className="btn btn-xs btn-circle "><FaCircleInfo /></button>
                                        <button onClick={() => handleDelete(movie._id)} className="btn btn-xs btn-circle btn-error " ><FaTrashCan /></button>

                                    </div></td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Modal modalId={modalId} modalTitle={'Edit Movie'}>
                <AddandEditFrom editData={editData} mutate={mutate} />
            </Modal>
        </>
    );
};

export default MoviesTable;