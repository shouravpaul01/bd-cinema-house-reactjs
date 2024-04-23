import axiosInstance from "../../../axiosConfig";
import { FaArrowRightArrowLeft, FaCircleInfo, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Modal from "../CommonComponents/Modal";
import { Link } from "react-router-dom";
import moment from "moment";
import Loading from "../CommonComponents/Loading";
import AddandEditMovieForm from "./AddandEditMovieForm";
import MovieDetails from "./MovieDetails";


const MoviesTable = ({ movies, mutate }) => {

    const [modalId, setModalId] = useState(null)
    const [editData, setEditData] = useState(null)
    const [details, setDetails] = useState(null)

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
                if (res.status == 200) {
                    toast.success(res.data.message);
                    mutate()
                }
            })
    }

    const handleEdit = (_id) => {
        axiosInstance.get(`/movie/details/${_id}`)
            .then(res => {
                setEditData(res.data)
                handleModal(_id)
            })
    }

    const handleDetails = (_id) => {
        axiosInstance.get(`/movie/details/${_id}`)
            .then(res => {
                setDetails(res.data)
                handleModal(_id)
            })
    }

    const handleModal = (_id) => {
        document.getElementById(_id).showModal()
    }
    const handleCloseModal = () => {
        setEditData(null)
        setDetails(null)
    }
    return (
        <>
            <div className="overflow-x-auto pt-6 " >
                <table className="table bg-white">
                    {
                        movies?.length == 0 && <caption className=" caption-bottom">
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
                            <th>Release Date</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies?.map((movie, index) => <tr key={movie._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={movie?.image?.url} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{movie.name}</div>
                                            <div className="text-sm opacity-50">Rating: {movie.rating}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{moment(movie.releaseDate).format('ll')}</td>
                                <td>{movie.duration}</td>
                                <td><button className={`btn btn-xs w-[100px] uppercase ${movie.status == 'deactive' ? 'btn-error' : 'btn-primary'}`} onClick={() => handleStatus(movie._id, movie.status == 'deactive' ? 'active' : 'deactive')}><FaArrowRightArrowLeft />
                                    {movie.status}</button></td>
                                <td>
                                    <div className="flex gap-2 ">
                                        <Link to={`?_id=${movie._id}`} onClick={() => { handleEdit(movie._id), setModalId(movie._id) }} className="btn btn-sm btn-circle btn-primary "><FaPenToSquare /></Link>
                                        <button onClick={() => { handleDetails(movie._id), setModalId(movie._id) }} className="btn btn-sm btn-circle "><FaCircleInfo /></button>
                                        <button onClick={() => handleDelete(movie._id)} className="btn btn-sm btn-circle btn-error " ><FaTrashCan /></button>

                                    </div></td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Modal width={editData ? 'w-11/12 max-w-5xl' : 'w-9/12 max-w-3xl'} modalId={modalId} handleCloseModal={handleCloseModal} modalTitle={editData ? 'Edit Movie' : 'Movie Details'}>
                {editData && <AddandEditMovieForm editData={editData} mutate={mutate} />}
                {details && <MovieDetails details={details} />}
            </Modal>
        </>
    );
};

export default MoviesTable;