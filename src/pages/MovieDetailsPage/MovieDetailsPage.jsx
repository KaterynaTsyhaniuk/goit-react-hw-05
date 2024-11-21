import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { searchMoviesById } from "../../services/api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await searchMoviesById(movieId);
      setMovie(data);
    };
    getData();
  }, [movieId]);

  if (!movie) {
    return <h2>Loading ...</h2>;
  }
  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
      <h2>{movie.title}</h2>
      <Link to="cast">MovieCast</Link>
      <Link to="reviews">MovieReviews</Link>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
