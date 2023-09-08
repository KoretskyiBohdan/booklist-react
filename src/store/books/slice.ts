import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookType } from 'apiTypes';
import { fetchNextPage, addNewBook, updateBook, refreshData } from './api';

type StateType = {
  data: BookType[];
  page: number;
  isLoading: boolean;
  isOnUpdating: boolean;
  hasMoreItemsToLoad: boolean;
  error: null | string;
};

const initialState: StateType = {
  data: [],
  page: 0,
  isLoading: false,
  isOnUpdating: false,
  hasMoreItemsToLoad: true,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNextPage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNextPage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasMoreItemsToLoad = action.payload.length !== 0;
      state.data = state.data.concat(action.payload);
    });
    builder.addCase(fetchNextPage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });

    builder.addCase(addNewBook.fulfilled, (state, action) => {
      if (state.hasMoreItemsToLoad) return;
      state.data = state.data.concat([action.payload]);
    });

    builder.addCase(updateBook.fulfilled, (state, action) => {
      const { id } = action.payload;
      const index = state.data.findIndex((book) => book.id === id);
      state.data[index] = action.payload;
    });

    builder.addCase(refreshData.pending, (state) => {
      state.isOnUpdating = true;
    });
    builder.addCase(refreshData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isOnUpdating = false;
    });
    builder.addCase(refreshData.rejected, (state) => {
      state.isOnUpdating = false;
    });
  },
});

export const { setPage } = booksSlice.actions;
export default booksSlice.reducer;
