import { useEffect, useState, useRef } from "react";
import { Link, useParams, useLocation, Outlet } from "react-router-dom";
import axios from "axios";

const API_KEY = "18efadd4c3d35845ab9ed0dc7d1aa4ce";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from || "/movies");

  useEffect(() => {
    if (!movieId) return;

    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then((res) => setMovie(res.data))
      .catch(console.error);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "https://via.placeholder.com/250x375?text=No+Image";

  return (
    <div>
      <Link to={backLink.current}>← Go back</Link>
      <h2>{movie.title}</h2>
      <img src={poster} alt={movie.title} width={250} />
      <p>{movie.overview}</p>

      <ul>
        <li>
          <Link to="cast">👉 Cast</Link>
        </li>
        <li>
          <Link to="reviews">👉 Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
