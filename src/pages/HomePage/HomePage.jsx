import MovieList from "/src/components/MovieList/MovieList";

const HomePage = ({ movies }) => {
  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
