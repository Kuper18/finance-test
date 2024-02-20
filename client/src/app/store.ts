import { configureStore } from '@reduxjs/toolkit';
import tickersReducer from '../features/tickers';
import newsReducers from '../features/news';

const store = configureStore({
  reducer: {
    tickers: tickersReducer,
    news: newsReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
