import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "/src/components/MovieList/MovieList";
import SearchBar from "/src/components/SearchBar/SearchBar";
import { searchMovies } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MoviesPage = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      setIsLoading(true);
      if (!query.trim()) {
        setFilteredMovies([]);
        setNoResults(false);
        setIsLoading(false);
        return;
      }

      try {
        const data = await searchMovies(query);
        setFilteredMovies(data.results);
        setNoResults(data.results.length === 0);
        setError(null);
      } catch (error) {
        setNoResults(true);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredMovies();
  }, [query]);

  const handleSearch = (query) => {
    if (typeof query !== "string") return;
    setSearchParams({ query: query.trim() });
  };

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <SearchBar onSearch={handleSearch} />
      {noResults && <p>No movies found. Try searching for something else!</p>}
      {filteredMovies.length > 0 && <MovieList movies={filteredMovies} />}
    </div>
  );
};

export default MoviesPage;
