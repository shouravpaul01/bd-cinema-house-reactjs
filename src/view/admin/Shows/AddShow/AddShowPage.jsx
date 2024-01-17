import AddandEditShowFrom from "../../../../components/AdminComponents/AddandEditShowFrom";
import Heading from "../../../../components/AdminComponents/Heading";


const AddShowPage = () => {
    return (
        <>
          <Heading title={'Movie Shows'} btnName={'Shows'} hrefUrl={'/dashboard/shows'}/> 
           <AddandEditShowFrom/>  
        </>
    );
};

export default AddShowPage;