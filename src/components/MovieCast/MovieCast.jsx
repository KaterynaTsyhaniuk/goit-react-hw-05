import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMoviesCreditsById } from "../../services/api";
import s from "./MovieCast.module.css";

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
      <ul className={s.castList}>
        {credits.map((credit) => (
          <li key={credit.id}>
            <h3>{credit.name}</h3>
            <p>{credit.character}</p>
            <img
              className={s.profileImage}
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
