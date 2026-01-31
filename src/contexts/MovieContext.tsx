import { createContext,useState,useContext,useEffect } from "react";

const MovieContext = createContext<any>(null);

export const useMovieContext = () =>  useContext(MovieContext);
export const MovieProvider = ({children}: {children: React.ReactNode}) => {
    // Initialize state from localStorage immediately
    const [favorites, setFavorites] = useState<any[]>(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    // Persist to localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = (movieId: number) => {
        return favorites.some((movie) => movie.id === movieId);
    }

    const addFavorite = (movie: any) => {
        if (!isFavorite(movie.id)) {
            setFavorites([...favorites, movie]);
        }
    }

    const removeFavorite = (movieId: number) => {
        setFavorites(favorites.filter((movie) => movie.id !== movieId));
    }

    return <MovieContext.Provider value={{ favorites, isFavorite,addFavorite,removeFavorite }}>
        {children}
        </MovieContext.Provider>
}