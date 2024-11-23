import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMoviesCreditsById } from "../../services/api";
import s from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const { movieId } = useParams();

  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await searchMoviesCreditsById(movieId);
        setCredits(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && (
        <ul className={s.castList}>
          {credits.map((credit) => (
            <li key={credit.id}>
              <h3>{credit.name}</h3>
              <p>{credit.character}</p>
              <img
                className={s.profileImage}
                src={
                  credit.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${credit.profile_path}`
                    : `https://ui-avatars.com/api/?name=${credit.name}&size=150`
                }
                alt={credit.name}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
