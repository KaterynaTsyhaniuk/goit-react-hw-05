import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div>
      <h2>Goodday</h2>
    </div>
  );
};

export default HomePage;
