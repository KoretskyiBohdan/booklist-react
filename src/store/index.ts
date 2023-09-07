import { configureStore } from '@reduxjs/toolkit';
import booksSlice from './booksSlice';

export const createStore = () => {
  return configureStore({ reducer: { books: booksSlice } });
};

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
