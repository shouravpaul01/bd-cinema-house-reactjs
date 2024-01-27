import React, { useEffect, useState } from 'react';
import Heading from '../../../components/AdminComponents/Heading';
import UserTable from '../../../components/AdminComponents/UserTable';
import useSWR from 'swr';
import Pagination from '../../../components/CommonComponents/Pagination';
import SearchInput from '../../../components/CommonComponents/SearchInput';
const fetcher = (...args) => fetch(...args).then(res => res.json())

const UserPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchValue, setSearchValue] = useState(null);

    const { data: users = [], mutate,isLoading:isUserLoading } = useSWR(`http://localhost:3000/user?page=${currentPage}&search=${searchValue}`, fetcher);
    console.log(users.data);
    return (
        <>
            <Heading title={'Add Movie'} btnName={'add'} hrefUrl={'/dashboard/movie/add'} />
            <div className="py-4">
                <div className="w-full md:w-80">
                    <SearchInput setSearchValue={setSearchValue} />
                </div>
                <UserTable users={users?.data} mutate={mutate} isUserLoading={isUserLoading}/>
                <div className="mt-3">
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                </div>
            </div>
        </>
    );
};

export default UserPage;