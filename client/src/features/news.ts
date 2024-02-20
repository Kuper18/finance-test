/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../types/articles';
import { getNews } from '../utils/fetchClient';

type NewsType = {
  articles: Article[];
  loading: boolean;
  error: string;
};

const initialState: NewsType = {
  articles: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('news/fetch', async () => {
  return getNews();
});

const newsSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload.articles;
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong!';
    });
  },
});

export const { actions } = newsSlice;
export default newsSlice.reducer;
