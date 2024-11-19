import { useEffect } from "react";

const MoviesPage = () => {
  useEffect(() => {
    document.title = "Movies";
  }, []);
  return (
    <div>
      <h2>Hello</h2>
    </div>
  );
};

export default MoviesPage;
