import { useEffect, useState } from "react";
import ShowTable from "../../../components/AdminComponents/ShowTable";
import Pagination from "../../../components/CommonComponents/Pagination";
import useAllMovieShow from "../../../hooks/useAllMovieShow";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { FaPlus, FaTrashCan, FaXmark } from "react-icons/fa6";
import Loading from "../../../components/CommonComponents/Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../../axiosConfig";
import AddandEditShowForm from "../../../components/AdminComponents/AddandEditShowForm";
import { RiMovie2Fill } from "react-icons/ri";

const ShowsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [contentHide, setContentHide] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const showId = searchParams.get("showId") || null;
  const date = searchParams.get("date") || null;
  const timeTypePriceId = searchParams.get("timeTypePriceId") || null;
  const [editData, setEditData] = useState(null);
  const [softDeletedData, setSoftDeletedData] = useState(false);
  const { moviesShow, mutate, isLoading } = useAllMovieShow(
    currentPage,
    searchValue,
    softDeletedData
  );

  useEffect(() => {
    if (showId && timeTypePriceId) {
      console.log(showId, timeTypePriceId);
      axiosInstance
        .get(
          `/showtimes/edit-data?showId=${showId}&timeTypePriceId=${timeTypePriceId}`
        )
        .then((res) => {
          console.log(res, "r");
          setContentHide(true);
          setEditData(res?.data?.data);
        });
    }
    if (showId && date) {
      axiosInstance.get(`/showtimes/edit-data?showId=${showId}`).then((res) => {
        console.log(res, "e");
        setContentHide(true);
        setEditData(res.data?.data);
      });
    }
  }, [searchParams]);
  return (
    <section>
      {contentHide && (
        <div className="bg-gray-100 ">
          <div className="flex items-center bg-violet-700 py-2 px-4">
            <p className="font-bold text-white flex-1">
              {editData ? "Edit" : "Add"} Movie Show
            </p>
            <button
              onClick={() => {
                setContentHide(!contentHide),
                  navigate("/dashboard/shows"),
                  setSearchParams(""),
                  setEditData(null);
              }}
              className={`btn btn-sm btn-circle  ${
                contentHide ? "btn-error" : "btn-info"
              }`}
            >
              {contentHide ? <FaXmark /> : <FaPlus />}{" "}
            </button>
          </div>

          <div className=" transition duration-500 ">
            <AddandEditShowForm
              mutate={mutate}
              setContentHide={setContentHide}
              editData={editData}
            />
          </div>
        </div>
      )}
      <div className="bg-gray-100 mt-4">
        <div className="flex items-center gap-2 bg-violet-700 py-2 px-4">
          <p className="font-bold text-white flex-1">All Movies</p>
          <button
            onClick={() => {
              setContentHide(!contentHide),
                navigate("/dashboard/shows"),
                setSearchParams(""),
                setEditData(null);
            }}
            className={`btn btn-sm btn-circle ${
              contentHide ? "btn-error" : " btn-info"
            }`}
          >
            {contentHide ? <FaXmark /> : <FaPlus />}{" "}
          </button>
          <button
            onClick={() => setSoftDeletedData(!softDeletedData)}
            className="btn btn-sm text-white btn-outline btn-warning"
          >
            {softDeletedData === false ? <FaTrashCan /> : <RiMovie2Fill />}
            {softDeletedData === false ? "Trash" : "Movie Shows"}
          </button>
        </div>
        <div className="px-4 py-5">
          <div className="w-full md:w-80 mb-5">
            <Flatpickr
              options={{ dateFormat: "d-M-Y", static: true }}
              onChange={(selectedDates, dateStr, ins) => {
                setSearchValue(dateStr);
              }}
              className="input input-bordered w-full "
              placeholder="Date"
            />
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <ShowTable
              moviesShow={moviesShow?.data?.data}
              softDeletedData={softDeletedData}
              mutate={mutate}
            />
          )}

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={moviesShow?.data?.totalPages}
          />
        </div>
      </div>
    </section>
  );
};

export default ShowsPage;
