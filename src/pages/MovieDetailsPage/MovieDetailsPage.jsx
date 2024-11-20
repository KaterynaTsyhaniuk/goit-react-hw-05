import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMoviesById } from "../../services/api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await searchMoviesById(movieId);
      setMovie(data);
    };
    getData();
  }, [movieId]);

  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
      <h2>{movie.title}</h2>
    </div>
  );
};

export default MovieDetailsPage;
