import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { fetchTrendingMovies, addToFavorites } from "../redux/movieSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";



type Movie = {
  id: number;
  poster_path: string;
  title: string;
  overview: string; // Add this to match movieSlice.ts
};


const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const trendingMovies: Movie[] = useSelector((state: RootState) => state.movies.trendingMovies) || [];

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

return (
  <div className="pt-20 px-10 sm:p-15 md:p-20 min-h-screen">
    <h1 className="text-xl sm:text-2xl font-bold mb-4">Trending Movies 🎬</h1>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {trendingMovies.map((movie: Movie) => (
        <div key={movie.id} className="border p-3 rounded shadow-md flex flex-col">
          <Link to={`/movie/${movie.id}`} className="flex-grow">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded"
            />
            <h3 className="text-base sm:text-lg font-semibold mt-2">{movie.title}</h3>
          </Link>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm sm:text-base"
              onClick={() => {
                dispatch(addToFavorites(movie));
                alert('The movie has been added to your favorites');
              }}
            >
              Add to Favorite
            </button>
            <Link
              to={`/movie/${movie.id}`}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm sm:text-base text-center"
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default Home;
