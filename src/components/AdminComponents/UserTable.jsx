import { toast } from "react-toastify";
import axiosInstance from "../../../axiosConfig";
import { mutate } from "swr";
import Pagination from "../CommonComponents/Pagination";
import { FaCircleInfo, FaTrashCan } from "react-icons/fa6";
import Loading from "../CommonComponents/Loading";

const UserTable = ({ users, mutate, isUserLoading }) => {
    if (isUserLoading) {
        return <Loading />
    }
    const handleRole = (_id, role) => {
        axiosInstance.patch(`/user/update-role?_id=${_id}&role=${role}`)
            .then(res => {
                if (res.data.code == 200) {
                    toast.success(res.data.message);
                    mutate()
                }

            })
    }
    const handleDelete = (_id) => {
        axiosInstance.delete(`/user/${_id}`)
            .then(res => {
                if (res.data.code == 200) {
                    toast.success(res.data.message);
                    mutate()

                }
            })
    }
    return (
        <>
           <div className="overflow-x-auto pt-6">
                <table className="table bg-white">
                {
                        users?.length == 0 && <caption className=" caption-bottom">
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
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td><button className="btn btn-xs btn-primary uppercase" onClick={() => handleRole(user._id, user.role == 'Admin' ? 'User' : 'Admin')}>{user?.role}</button></td>
                                <td>
                                    <button onClick={() => handleDelete(user?._id)} className="btn btn-sm btn-circle btn-error " ><FaTrashCan /></button>

                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </>

    );
};

export default UserTable;