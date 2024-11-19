import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Header from "./Header/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movieDetails" element={<MovieDetailsPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
