import { RootState } from 'store';

export const selectBooks = (state: RootState) => state.books.data;

export const selectPage = (state: RootState) => state.books.page;

export const selectIsLoading = (state: RootState) => state.books.isLoading;

export const selectIsOnUpdating = (state: RootState) =>
  state.books.isOnUpdating;

export const selectHasMoreItemsToLoad = (state: RootState) =>
  state.books.hasMoreItemsToLoad;
