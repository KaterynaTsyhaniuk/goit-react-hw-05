import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Header from "./Header/Header";
import MovieCast from "./MovieCast/MovieCast";
import MovieReviews from "./MovieReviews/MovieReviews";
import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await searchMovies();
        setMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />

        <Route path="/movies" element={<MoviesPage movies={movies} />} />

        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="/movies/:movieId/cast" element={<MovieCast />} />
          <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
