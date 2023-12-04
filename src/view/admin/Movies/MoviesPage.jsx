import AddandEditFrom from "../../../components/AdminComponents/AddandEditFrom";
import Heading from "../../../components/AdminComponents/Heading";
import MoviesTable from "../../../components/AdminComponents/MoviesTable";



const MoviesPage = () => {  
   
    return (
        <>
            <Heading title={'Add Movie'} btnName={'add'} hrefUrl={'/dashboard/movie/add'}/>
            <MoviesTable/>

           
        </>
    );
};

export default MoviesPage;