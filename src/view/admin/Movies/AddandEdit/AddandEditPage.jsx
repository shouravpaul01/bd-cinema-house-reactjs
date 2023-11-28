import AddandEditFrom from "../../../../components/AdminComponents/AddandEditFrom";
import Heading from "../../../../components/AdminComponents/Heading";


const AddandEditPage = () => {
    return (
        <>
            <Heading title={'Movies'} btnName={'Movies'} hrefUrl={'/dashboard/movies'}/> 
            <AddandEditFrom/>
        </>
    );
};

export default AddandEditPage;