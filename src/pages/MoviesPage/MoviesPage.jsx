import { useState } from "react";
import MovieList from "/src/components/MovieList/MovieList";
import SearchBar from "/src/components/SearchBar/SearchBar";

const MoviesPage = ({ movies }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (query) => {
    if (typeof query !== "string") return;

    const filteredData = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filteredData);

    setNoResults(filteredData.length === 0 && query.trim() !== "");
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
