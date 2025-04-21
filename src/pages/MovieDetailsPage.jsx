import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import MovieCast from "../components/MovieCast/MovieCast";
import MovieReviews from "../components/MovieReviews/MovieReviews";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "18efadd4c3d35845ab9ed0dc7d1aa4ce"; // замени на свой API ключ
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
        );
        setMovie(response.data);
      } catch (err) {
        setError("Ошибка при загрузке данных о фильме");
        console.error(err);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <Link to={location.state?.from ?? "/"}>Back to movies</Link>
      <h2>{movie.title}</h2>
      {movie.poster_path && (
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          width="200"
        />
      )}
      <p>{movie.overview}</p>

      <MovieCast />
      <MovieReviews />
    </div>
  );
}

export default MovieDetailsPage;
