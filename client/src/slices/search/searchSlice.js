import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const searchMovies = createAsyncThunk(
  'search/searchMovies',
  async (payload, store) => {
    const res = await axios.get(
      `/search?query=${store.getState().search.query}`
    );
    return res.data;
  }
);

const initialState = {
  query: '',
  status: 'idle',
  movies: [],
  totalResults: null,
};

// Create slice
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload.results;
        state.totalResults = action.payload.total_results;
      });
  },
});

// Actions
export const { updateQuery } = searchSlice.actions;

// Reducers
export default searchSlice.reducer;

// Selectors
export const selectQuery = (state) => state.search.query;
export const selectStatus = (state) => state.search.status;
export const selectAllMovies = (state) => state.search.movies;
export const selectTotalResults = (state) => state.search.totalResults;
export const selectMovieById = (state, id) =>
  state.search.movies.find((el) => el.id === id);