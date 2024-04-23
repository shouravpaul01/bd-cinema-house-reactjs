

const MovieDetails = ({ details }) => {

    return (
        <div className="">
            <div className="flex justify-center">
                <img src={details.image?.url} className="w-[150px] h-[200px] rounded-md" alt={details?.name} />
            </div>
            <div>
                <p><span className="font-bold">Name:</span> {details?.name}</p>
                <p><span className="font-bold">Duration:</span> {details?.duration}</p>
                <p><span className="font-bold">Category:</span> {details?.category}</p>
                <p><span className="font-bold">Rating:</span> {details?.rating}</p>
                <p><span className="font-bold">Genres:</span> {
                    details?.genre?.map((genre,index)=><span key={index} className="badge badge-secondary me-2"> {genre.value}</span>)
                }</p>
                <p><span className="font-bold">Language:</span> {
                    details?.language?.map((language,index)=><span key={index} className="badge badge-secondary me-2"> {language.value}</span>)
                }</p>
            </div>
        </div>

    );
};

export default MovieDetails;