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
    <div className="p-4 min-h-screen">
      {movieDetails && (
        <>
          <h1 className="text-2xl font-bold">{movieDetails.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="rounded-lg  h-[500px] w-auto pt-20 max-md:h-[300px]"
          />
          <p className="mt-2 text-gray-300">{movieDetails.overview}</p>
          <button
            onClick={() => {
                dispatch(addToFavorites(movieDetails));
                alert('The movie has been added to your favorites');
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
            Add to Favorites ❤️
          </button>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
