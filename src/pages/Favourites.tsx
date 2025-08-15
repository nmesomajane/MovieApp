import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { removeFromFavorites } from "../redux/movieSlice";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const favorites: Movie[] = useSelector((state: RootState) => state.movies.favorites) || [];

  return (
  <div className="container mx-auto px-4 py-20 min-h-screen text-center text-white">
    <h1 className="text-3xl font-bold text-white mb-6">My Favorites ❤️</h1>

    {favorites.length === 0 ? (
      <p className="text-gray-400">No favorite movies added yet.</p>
    ) : (
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between"
          >
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-full h-auto object-cover"
              />
              <p className="mt-2 text-white text-lg">{movie.title}</p>
            </Link>

            <button
              className="mt-4 bg-red-500 hover:bg-red-600 transition-colors text-white px-4 py-1 rounded"
              onClick={() => dispatch(removeFromFavorites(movie.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default Favorites;
