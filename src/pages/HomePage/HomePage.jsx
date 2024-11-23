import { useEffect, useState } from "react";
import { searchTrendingMovies } from "../../services/api";
import MovieList from "/src/components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await searchTrendingMovies();
        setMovies(data.results);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
