/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import { Tickers } from '../types/tickers';
import type { RootState } from '../app/store';

type TickersType = {
  tickersToRemove: string[];
  tickers: Tickers[];
  previousTickers: Tickers[];
  tickersNames: string[];
};

const initialState: TickersType = {
  tickersToRemove: [],
  tickers: [],
  previousTickers: [],
  tickersNames: [],
};

const tickerSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    setTickers: (state, action) => {
      state.tickers = action.payload;
    },
    removeTickers: (state, action) => {
      if (state.tickersToRemove.includes(action.payload)) {
        state.tickersToRemove = state.tickersToRemove.filter(
          (ticker) => ticker !== action.payload,
        );
      } else {
        state.tickersToRemove.push(action.payload);
      }
    },
    setPreviousTickers: (state, action) => {
      state.previousTickers = action.payload;
    },
    getTickersNames: (state, action) => {
      state.tickersNames = action.payload;
    },
  },
});

export const { actions } = tickerSlice;

export const init = createAsyncThunk(
  'tickers/fetch',
  async (_, { dispatch, getState }) => {
    const socket = io('http://localhost:4000');

    socket.emit('start');
    socket.on('tickersName', (data) => {
      dispatch(actions.getTickersNames(data));
    });
    socket.on('ticker', (data) => {
      const previousState = getState();

      dispatch(
        actions.setPreviousTickers(
          (previousState as RootState).tickers.tickers,
        ),
      );
      dispatch(actions.setTickers(data));
    });

    return new Promise<void>((resolve) => {
      socket.on('disconnect', () => {
        resolve();
      });
    });
  },
);

export default tickerSlice.reducer;
