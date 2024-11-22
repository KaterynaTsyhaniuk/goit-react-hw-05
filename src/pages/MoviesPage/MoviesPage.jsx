import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "/src/components/MovieList/MovieList";
import SearchBar from "/src/components/SearchBar/SearchBar";
import { searchMovies } from "../../services/api";

const MoviesPage = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      if (!query.trim()) {
        setFilteredMovies([]);
        setNoResults(false);
        return;
      }

      try {
        const data = await searchMovies(query);
        setFilteredMovies(data.results);
        setNoResults(data.results.length === 0);
      } catch (error) {
        console.error("Failed to fetch filtered movies:", error);
        setNoResults(true);
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
      <SearchBar onSearch={handleSearch} />
      {noResults && <p>No movies found. Try searching for something else!</p>}
      {filteredMovies.length > 0 && <MovieList movies={filteredMovies} />}
    </div>
  );
};

export default MoviesPage;
