import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMoviesReviewsById } from "../../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await searchMoviesReviewsById(movieId);
      setReviews(data);
    };
    getData();
  }, [movieId]);

  return (
    <div>
      {reviews.length === 0 && (
        <p>We don&apos;t have any rewiews for this movie.</p>
      )}
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>Author: {review.author}</strong>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
