import MovieCard from "../components/MovieCard"
import '../css/Home.css';
import { useEffect, useState } from "react";
import { getPopularMovies, searchMovie } from "../services/api";

function Home(){
    const [searchTerm, setSearchTerm] = useState("");
    // const [filteredMovies, setFilteredMovies] = useState<typeof movies>([]);
    const [movies,setMovies] = useState<any[]>([])
    const [error,setError] =useState<string | null>(null);
    const [loading,setLoading] = useState<boolean>(false);

   useEffect(() => {
     const fetchMovies= async () => {
        try{
            setLoading(true);
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
        }catch(error){
          setError(`Error fetching popular movies: ${error}`);
        } finally {
          setLoading(false);
        }
     }
        fetchMovies();
  }, []);

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setLoading(true);
            if (!searchTerm) {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }else{
                const movies = await searchMovie(searchTerm);
                setMovies(movies);
            }
        } catch (error) {
            setError(`Error searching movies: ${error}`);
        } finally {
            setLoading(false);
        }
      
    }

    return (
        <div className="home">
            <h1>Explore Movies</h1>

            <form className="search-form" onSubmit={handleSearch}>
                <input type="text" className="search-input" value={searchTerm} placeholder="Search movies..." onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="movies-grid">
                {loading ? <p>Loading movies...</p> : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    )
}

export default Home