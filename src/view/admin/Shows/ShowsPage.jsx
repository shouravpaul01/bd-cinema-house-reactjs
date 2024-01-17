import Heading from "../../../components/AdminComponents/Heading";
import ShowTable from "../../../components/AdminComponents/ShowTable";


const ShowsPage = () => {
    return (
        <> 
        <Heading title={'Add Movie Shows'} btnName={'add'} hrefUrl={'/dashboard/show/add'}/>
        <ShowTable/>
        </>
    );
};

export default ShowsPage;