import React, { useEffect, useState } from 'react';
import Heading from '../../../components/AdminComponents/Heading';
import UserTable from '../../../components/AdminComponents/UserTable';
import useSWR from 'swr';
import Pagination from '../../../components/CommonComponents/Pagination';
const fetcher = (...args) => fetch(...args).then(res => res.json())

const UserPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { data: users=[] ,mutate  } = useSWR(`http://localhost:3000/user?page=${currentPage}`, fetcher);
    console.log(users.data);
    return (
        <>
           <Heading title={'Add Movie'} btnName={'add'} hrefUrl={'/dashboard/movie/add'}/>
            <UserTable users={users?.data} mutate={mutate}/> 
            <section className="flex justify-center mt-3">
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
            </section> 
        </>
    );
};

export default UserPage;