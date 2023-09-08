import { createSlice } from '@reduxjs/toolkit';
import { BookType } from 'apiTypes';
import { fetchNextPage, addNewBook } from './api';

type StateType = {
  data: BookType[];
  page: number;
  isLoading: boolean;
  hasMoreItemsToLoad: boolean;
  error: null | string;
};

const initialState: StateType = {
  data: [],
  page: 1,
  isLoading: false,
  hasMoreItemsToLoad: true,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
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
  },
});

export const { incrementPage } = booksSlice.actions;
export default booksSlice.reducer;
