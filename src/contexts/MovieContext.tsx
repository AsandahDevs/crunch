import { createContext,useState,useContext,useEffect } from "react";

const MovieContext = createContext<any>(null);

export const useMovieContext = () =>  useContext(MovieContext);
export const MovieProvider = ({children}: {children: React.ReactNode}) => {
    const [favorites,setFavorites] = useState<any[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

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