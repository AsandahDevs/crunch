import { useMovieContext } from '../contexts/MovieContext';
import '../css/MovieCard.css';

function MovieCard({movie}: {movie: any}) {
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const {isFavorite,addFavorite,removeFavorite} = useMovieContext();

  function onFavoriteClick() {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className='movies-poster'>
        <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title}  />
        <div className="movie-overlay">
          <button className="favorite-btn" onClick={onFavoriteClick}>
            ❤️
          </button>
        </div>
      </div>
       <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date ? movie.release_date.split('-')[0] : 'Unknown Year'}</p>
      </div>
    </div>
   
  );
}

export default MovieCard;