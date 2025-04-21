import { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "18efadd4c3d35845ab9ed0dc7d1aa4ce"; // замени на свой API ключ

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Ошибка при загрузке фильмов", error);
      }
    }

    fetchMovies();
  }, []);

  return <MovieList movies={movies} />;
}

export default HomePage;
