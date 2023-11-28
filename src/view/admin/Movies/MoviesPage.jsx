import AddandEditFrom from "../../../components/AdminComponents/AddandEditFrom";
import Heading from "../../../components/AdminComponents/Heading";
import MoviesTable from "../../../components/AdminComponents/MoviesTable";
import Modal from "../../../components/CommonComponents/Modal";


const MoviesPage = () => {  
   
    return (
        <>
            <Heading title={'Add Movie'} btnName={'add'} hrefUrl={'/dashboard/movie/add'}/>
            <MoviesTable/>

            {/* <Modal modalID={'modal1'} modalTitle={'Add Movie'}>
                <AddandEditFrom/>
            </Modal> */}
        </>
    );
};

export default MoviesPage;