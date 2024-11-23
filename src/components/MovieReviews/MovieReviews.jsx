import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMoviesReviewsById } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await searchMoviesReviewsById(movieId);
        setReviews(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {reviews.length === 0 && (
        <p>We don&apos;t have any rewiews for this movie.</p>
      )}
      {!isLoading && !error && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>Author: {review.author}</strong>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
