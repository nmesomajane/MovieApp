// favoritesSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// interface FavoritesState {
//   favorites: number[]; // or the correct type for your favorites
// }


// const initialState: FavoritesState = {
//   favorites: [],
// };

// const favoritesSlice = createSlice({
//   name: 'favorites',
//   initialState,
//   reducers: {
//     addFavorite: (state, action: PayloadAction<number>) => {
//       state.favorites.push(action.payload);
//     },
//     removeFavorite: (state, action: PayloadAction<number>) => {
//       state.favorites = state.favorites.filter(fav => fav !== action.payload);
//     },
//   },
// });

// export const { addFavorite, removeFavorite } = favoritesSlice.actions;
// export default favoritesSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

// Export RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
