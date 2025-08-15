import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieDetails, addToFavorites } from "../redux/movieSlice";
import { RootState, AppDispatch } from "../redux/Store";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const movieDetails: Movie | null = useSelector((state: RootState) => state.movies.movieDetails);

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieDetails(movieId));
    }
  }, [dispatch, movieId]);

  return (
  <div className="p-4 min-h-screen flex flex-col items-center text-center">
    {movieDetails && (
      <>
        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold mb-4">{movieDetails.title}</h1>

        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="rounded-lg w-full max-w-md h-auto mb-6"
        />

        {/* Overview */}
        <p className="mt-2 text-gray-300 text-sm md:text-base max-w-2xl">
          {movieDetails.overview}
        </p>

        {/* Add to Favorites Button */}
        <button
          onClick={() => {
            dispatch(addToFavorites(movieDetails));
            alert("The movie has been added to your favorites");
          }}
          className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-6 py-2 rounded mt-6"
        >
          Add to Favorites ❤️
        </button>
      </>
    )}
  </div>
);

};

export default MovieDetails;
