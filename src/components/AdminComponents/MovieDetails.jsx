<<<<<<< HEAD
const MovieDetails = ({ details }) => {
  return (
    <div className="">
      <div className="flex justify-center">
        <img
          src={details.image?.url}
          className="w-[150px] h-[200px] rounded-md"
          alt={details?.title}
        />
      </div>
      <div>
        <p>
          <span className="font-bold">Title:</span> {details?.title}
        </p>
        <p>
          <span className="font-bold">Director:</span> {details?.director}
        </p>
        <p>
          <span className="font-bold">Actors:</span>{" "}
          {details?.actors?.map((actor, index) => (
            <span key={index} className="badge badge-secondary me-2">
              {" "}
              {actor}
            </span>
          ))}
        </p>
        <p>
          <span className="font-bold">Duration:</span> {details?.duration}
        </p>
        <p>
          <span className="font-bold">Category:</span> {details?.category}
        </p>
        <p>
          <span className="font-bold">Rating:</span> {details?.rating}
        </p>
        <p>
          <span className="font-bold">Genres:</span>{" "}
          {details?.genres?.map((genre, index) => (
            <span key={index} className="badge badge-secondary me-2">
              {" "}
              {genre}
            </span>
          ))}
        </p>
        <p>
          <span className="font-bold">Language:</span>{" "}
          {details?.languages?.map((language, index) => (
            <span key={index} className="badge badge-secondary me-2">
              {" "}
              {language}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
=======


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
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
