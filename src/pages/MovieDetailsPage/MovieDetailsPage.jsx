import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { searchMoviesById } from "../../services/api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [releaseYear, setReleaseYear] = useState("");
  const [movieRating, setMovieRating] = useState("");

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
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
      <h2>
        {movie.title}({releaseYear})
      </h2>
      <p>User Score: {movieRating}%</p>
      <h3>Overview</h3>
      <p>{movie.overview}</p>
      <h4>Genres</h4>
      <p>{genreName}</p>
      <p>{movie.genre_ids}</p>
      <Link to="cast">MovieCast</Link>
      <Link to="reviews">MovieReviews</Link>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
