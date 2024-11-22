import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { searchMoviesById } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [releaseYear, setReleaseYear] = useState("");
  const [movieRating, setMovieRating] = useState("");
  const location = useLocation();
  const goBack = useRef(location?.state ?? "/movie");

  useEffect(() => {
    const getData = async () => {
      const data = await searchMoviesById(movieId);
      setMovie(data);

      if (data.release_date) {
        setReleaseYear(data.release_date.split("-")[0]);
      }

      if (data.vote_average) {
        const percent = Math.round((data.vote_average / 10) * 100);
        setMovieRating(percent);
      }
    };
    getData();
  }, [movieId]);

  if (!movie) {
    return <h2>Loading ...</h2>;
  }

  const genreName = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div>
      <Link to={goBack.current}>Go back</Link>
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
      <div className={s.castReviewList}>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
