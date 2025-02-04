import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovieDetails } from "../API/movieApi";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch movie details
export const getMovieDetails = createAsyncThunk("movies/details", async (movieId: string) => {
  return await fetchMovieDetails(movieId);
});

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface MoviesState {
  trendingMovies: Movie[];
  movies: Movie[];
  movieDetails: Movie | null;
  favorites: Movie[]; // ADD FAVORITES ARRAY
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MoviesState = {
  trendingMovies: [],
  movies: [],
  movieDetails: null,
  favorites: [], // INITIALIZE FAVORITES
  status: "idle",
  error: null,
};

// Fetch trending movies
export const fetchTrendingMovies = createAsyncThunk("movies/fetchTrending", async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  return response.data.results;
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      const movieExists = state.favorites.some((movie) => movie.id === action.payload.id);
      if (!movieExists) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((movie) => movie.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      state.trendingMovies = action.payload;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, action) => {
      state.movieDetails = action.payload;
    });
  },
});

// EXPORT ACTIONS
export const { addToFavorites, removeFromFavorites } = movieSlice.actions;
export default movieSlice.reducer;
