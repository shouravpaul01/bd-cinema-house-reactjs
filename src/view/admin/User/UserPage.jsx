<<<<<<< HEAD
import { useState } from "react";
import UserTable from "../../../components/AdminComponents/UserTable";
import useSWR from "swr";
import Pagination from "../../../components/CommonComponents/Pagination";
import Loading from "../../../components/CommonComponents/Loading";
import axiosInstance from "../../../../axiosConfig";
import InputSearch from "../../../components/CommonComponents/InputSearch";
const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const {
    data: users = [],
    mutate,
    isLoading,
  } = useSWR(`/users?page=${currentPage}&search=${searchValue}`, fetcher);

  return (
    <section>
      <div className="bg-gray-100 mt-4">
        <div className="  bg-violet-700 py-2 px-4">
          <p className="font-bold text-white flex-1">All Users</p>
        </div>
        <div className="px-4 py-5">
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
            <div className="w-full md:w-80">
              <InputSearch
                setSearchValue={setSearchValue}
                classNameSearch={
                  " border border-violet-400 rounded-full py-1   focus:outline-violet-600 "
                }
                classNameSearchBtn={"rounded-e-full  p-1 text-violet-600"}
              />
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <UserTable
              users={users?.data?.data}
              mutate={mutate}
              isUserLoading={isLoading}
            />
          )}

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={users?.data?.totalPages}
          />
        </div>
      </div>
    </section>
    // <>
    //     <Heading title={'Add Movie'} btnName={'add'} hrefUrl={'/dashboard/movie/add'} />
    //     <div className="py-4">
    //         <div className="w-full md:w-80">
    //             <SearchInput setSearchValue={setSearchValue} />
    //         </div>
    //         <UserTable users={users?.data} mutate={mutate} isUserLoading={isUserLoading}/>
    //         <div className="mt-3">
    //             <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={users?.totalPages} />
    //         </div>
    //     </div>
    // </>
  );
};

export default UserPage;
=======
import React, {  useState } from 'react';
import UserTable from '../../../components/AdminComponents/UserTable';
import useSWR from 'swr';
import Pagination from '../../../components/CommonComponents/Pagination';
import Loading from '../../../components/CommonComponents/Loading';
import axiosInstance from '../../../../axiosConfig';
import InputSearch from '../../../components/CommonComponents/InputSearch';
const fetcher = url => axiosInstance.get(url).then(res => res.data)

const UserPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    const { data: users = [], mutate,isLoading } = useSWR(`/user?page=${currentPage}&search=${searchValue}`, fetcher);
    console.log(users.data);
    return (
        <section >
        
        <div className="bg-gray-100 mt-4">
            <div className='  bg-violet-700 py-2 px-4'>

                <p className="font-bold text-white flex-1">All Users</p>
               
            </div>
            <div className="px-4 py-5">

                <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
                    <div className="w-full md:w-80">
                        <InputSearch setSearchValue={setSearchValue} classNameSearch={' border border-violet-400 rounded-full py-1   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'} />
                    </div>

                </div>
                {
                    isLoading ? <Loading /> : <UserTable users={users?.data} mutate={mutate} isUserLoading={isLoading}/>
                }


                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={users?.totalPages} />



            </div>
        </div>
    </section>
        // <>
        //     <Heading title={'Add Movie'} btnName={'add'} hrefUrl={'/dashboard/movie/add'} />
        //     <div className="py-4">
        //         <div className="w-full md:w-80">
        //             <SearchInput setSearchValue={setSearchValue} />
        //         </div>
        //         <UserTable users={users?.data} mutate={mutate} isUserLoading={isUserLoading}/>
        //         <div className="mt-3">
        //             <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={users?.totalPages} />
        //         </div>
        //     </div>
        // </>
    );
};

export default UserPage;
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
