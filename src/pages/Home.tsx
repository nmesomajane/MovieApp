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
    <div className="p-18 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Trending Movies 🎬</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {trendingMovies.map((movie: Movie) => (
          <div key={movie.id} className="border p-2 rounded shadow-md">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
            </Link>
            <div className="flex justify-between mt-5 mb-2">
              <button
                className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => {
                        dispatch(addToFavorites(movie));
                        alert('The movie has been added to your favorites');
                }}
              >
               Add to Favorite
              </button>
              <Link to={`/movie/${movie.id}`} className="bg-green-500 text-white px-4 py-1 rounded">
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
