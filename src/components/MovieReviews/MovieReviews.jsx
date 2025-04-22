import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieReviews.module.css";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "18efadd4c3d35845ab9ed0dc7d1aa4ce";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
        );
        setReviews(response.data.results);
      } catch (err) {
        setError("Ошибка при загрузке отзывов");
        console.error(err);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  if (reviews.length === 0) return <p>No reviews yet</p>;

  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h4>{author}</h4>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;
