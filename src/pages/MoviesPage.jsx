import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../components/MovieList/MovieList";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "18efadd4c3d35845ab9ed0dc7d1aa4ce";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const query = searchParams.get("query") || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputValue = form.elements.query.value.trim();

    if (inputValue) {
      setSearchParams({ query: inputValue });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error while searching for movies", error);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>

      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
