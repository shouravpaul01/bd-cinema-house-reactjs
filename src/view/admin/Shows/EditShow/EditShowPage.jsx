import { useLocation, useParams, useSearchParams } from "react-router-dom";
import AddandEditShowFrom from "../../../../components/AdminComponents/AddandEditShowFrom";
import Heading from "../../../../components/AdminComponents/Heading";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../axiosConfig";


const EditShowPage = () => {
    const [searchParams] = useSearchParams()
    const showId = searchParams.get('showId') || null
    const date = searchParams.get('date') || null
    const timeTypePriceId = searchParams.get('timeTypePriceId') || null

    const [editData, setEditData] = useState(null)

    useEffect(() => {
        if (showId && timeTypePriceId) {
            axiosInstance.get(`/show/edit-data?showId=${showId}&timeTypePriceId=${timeTypePriceId}`)
                .then(res => {
                    setEditData(res.data)
                })
        }
        if (showId && date) {
            console.log('showId');
            axiosInstance.get(`/show/edit-data?showId=${showId}`)
                .then(res => {
                    return setEditData(res.data)
                })
        }

    }, [showId])

    return (
        <>
            <Heading title={'Movie Shows'} btnName={'Shows'} hrefUrl={'/dashboard/shows'} />
            <AddandEditShowFrom editData={editData} />
        </>
    );
};

export default EditShowPage;