import { useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "18efadd4c3d35845ab9ed0dc7d1aa4ce"; // замени на свой API ключ

function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Ошибка при поиске фильмов", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>

      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
