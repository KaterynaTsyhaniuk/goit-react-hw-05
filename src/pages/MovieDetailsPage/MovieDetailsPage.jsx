import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { searchMoviesById } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [releaseYear, setReleaseYear] = useState("");
  const [movieRating, setMovieRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const goBack = useRef(location?.state ?? "/movie");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await searchMoviesById(movieId);
        setMovie(data);
        setError(null);

        if (data.release_date) {
          setReleaseYear(data.release_date.split("-")[0]);
        }

        if (data.vote_average) {
          const percent = Math.round((data.vote_average / 10) * 100);
          setMovieRating(percent);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  if (!movie) {
    return <Loader />;
  }

  const genreName = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div>
      <Link to={goBack.current}>Go back</Link>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && (
        <div className={s.moviesCard}>
          <img
            className={s.posterImage}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
          <div className={s.moviesInfo}>
            <h2>
              {movie.title} ({releaseYear})
            </h2>
            <p>User Score: {movieRating}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h4>Genres</h4>
            <p>{genreName}</p>
            <p>{movie.genre_ids}</p>
          </div>
        </div>
      )}

      <div className={s.castReviewList}>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
