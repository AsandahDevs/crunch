// Load environment-specific configuration
const ENVIRONMENT = import.meta.env.VITE_APP_ENV || 'development';
let API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Log the current environment
console.log(`🚀 TMDB API Client loaded for: ${ENVIRONMENT}`);

if (!API_KEY) {
  console.error('⚠️ VITE_TMDB_API_KEY is not set. Check your .env file or Docker secrets.');
}

// Note: In production with Docker secrets, the API_KEY will be a file path (/run/secrets/api_key)
// You would need a backend proxy to read the secret file, or handle it in a server-side environment

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return data.results;
}

export const searchMovie = async (query: string) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
    const data = await response.json();
    return data.results;
}