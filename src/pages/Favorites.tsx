import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/Favorites.css';

function Favorites() {
    const { favorites } = useMovieContext();
    if (favorites.length === 0) {
        return (
            <div className="favorites-empty">
                <h2>No favorites yet</h2>
                <p>You haven't added any movies to your favorites.</p>
            </div>
    );
    }else{
        return (
            <div className="favorites-container">
                {favorites.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        );
    }
}

export default Favorites;