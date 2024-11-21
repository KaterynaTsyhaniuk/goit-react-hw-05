import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMoviesCreditsById } from "../../services/api";

const MovieCast = () => {
  const { movieId } = useParams();

  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await searchMoviesCreditsById(movieId);
      setCredits(data);
    };
    getData();
  }, [movieId]);

  return (
    <div>
      <ul>
        {credits.map((credit) => (
          <li key={credit.id}>
            <h2>{credit.name}</h2>
            <p>{credit.character}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
              alt={credit.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
