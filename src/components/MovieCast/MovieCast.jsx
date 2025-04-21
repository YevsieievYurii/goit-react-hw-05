import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieCast.module.css";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "18efadd4c3d35845ab9ed0dc7d1aa4ce"; // замени на свой API ключ
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
        );
        setCast(response.data.cast);
      } catch (err) {
        setError("Ошибка при загрузке актёрского состава");
        console.error(err);
      }
    }

    fetchCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Cast</h3>
      <ul>
        {cast.map(({ id, name, profile_path, character }) => (
          <li key={id}>
            <img
              src={
                profile_path
                  ? `${IMAGE_BASE_URL}${profile_path}`
                  : "https://via.placeholder.com/100x150?text=No+Image"
              }
              alt={name}
              width="100"
            />
            <p>
              <strong>{name}</strong>
            </p>
            <p>as {character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
