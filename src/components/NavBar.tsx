import { Link } from "react-router-dom";
import "../css/NavBar.css";
import { useMovieContext } from "../contexts/MovieContext";

function NavBar() {
    const { favorites } = useMovieContext();
    return (
        <nav className="navbar">
            <div className="navbar-brand">Crunch</div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites ({favorites.length})</Link>
            </div>
        </nav>
    );
}
export default NavBar;