import { toast } from "react-toastify";
import axiosInstance from "../../../axiosConfig";
import { mutate } from "swr";
import Pagination from "../CommonComponents/Pagination";

const UserTable = ({users ,mutate}) => {
    const handleRole = (_id, role) => {
        axiosInstance.patch(`/user/update-role?_id=${_id}&role=${role}`)
            .then(res => {
                if (res.data.code == 200) {
                    toast.success(res.data.message);
                    mutate()
                }

            })
    }
    return (
        <>
        <div className="overflow-x-auto pt-10 " >
                <table className="table ">
                    {/* head */}
                    <thead>
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
                                <td><button className="btn btn-xs btn-primary uppercase" onClick={() => handleRole(user._id, user.role == 'admin' ? 'claint' : 'admin')}>{user?.role}</button></td>
                                <td>
                                    <div className="flex gap-2">
                                        

                                    </div></td>
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