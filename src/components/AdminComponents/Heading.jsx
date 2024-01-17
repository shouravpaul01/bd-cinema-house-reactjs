import { Link } from 'react-router-dom';
import { FaRegSquarePlus } from "react-icons/fa6";

const Heading = ({ title, hrefUrl, btnName, handleOnClick }) => {
    return (

        <div className="flex items-center bg-yellow-300 rounded-lg px-3 py-3">
            <div className="flex-1">
                <p className="font-bold uppercase">{title}</p>
            </div>
            {
                hrefUrl && <div>
                    <Link to={hrefUrl} className="btn btn-sm btn-primary uppercase"><FaRegSquarePlus />{btnName}</Link>
                </div>
            }
            {
                handleOnClick && <div>
                    <Link onClick={handleOnClick
                    } className="btn btn-sm btn-primary uppercase"><FaRegSquarePlus />{btnName}</Link>
                </div>
            }
        </div>
    );
};

export default Heading;