import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Ensure this is set in your .env file
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId: string) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};
