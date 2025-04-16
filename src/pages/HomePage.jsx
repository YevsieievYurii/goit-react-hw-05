import MovieList from "../components/MovieList/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // fetch trending movies
  }, []);

  return <MovieList movies={movies} />;
}
