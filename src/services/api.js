import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjJkYjQ3NmFkNDdhMGI2NDZkZmMwYzNjNmVhOWQ2NCIsIm5iZiI6MTczMjAxOTY4Ny43MzU1NzYyLCJzdWIiOiI2NzNjODIwNDE1MzMzZTczNjE5NWRiMjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._l_NlEtfaahJj9f-lfAftzAkQhg9BTBh7LEM-fmSN88`;

axios.defaults.params = {
  include_adult: false,
  language: "en-US",
};
export const searchMovies = async () => {
  const { data } = await axios.get(`/trending/movie/day`);
  return data;
};

export const searchMoviesById = async (id) => {
  const { data } = await axios.get(`/movie/${id}`);
  return data;
};

export const searchMoviesReviewsById = async (id) => {
  const { data } = await axios.get(`/movie/${id}/reviews`);
  return data.results;
};

searchMovies()
  .then((data) => console.log("Movies:", data))
  .catch((error) => console.error(error));
