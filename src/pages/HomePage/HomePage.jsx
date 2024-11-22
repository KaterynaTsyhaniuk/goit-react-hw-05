import { useEffect, useState } from "react";
import { searchTrendingMovies } from "../../services/api";
import MovieList from "/src/components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await searchTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
