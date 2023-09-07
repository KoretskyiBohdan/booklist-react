import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '.';

type BookType = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
};

type StateType = {
  data: BookType[];
  isLoading: boolean;
  error: null | string;
};

const initialState: StateType = {
  data: [],
  isLoading: false,
  error: null,
};

interface IFetchBooks {
  page: number;
}

export const fetchBooks = createAsyncThunk(
  'books/fetch',
  async ({ page }: IFetchBooks) => {
    const { data } = await axios<BookType[]>({
      url: `${process.env.REACT_APP_API_URL}/books`,
      params: {
        _page: page,
        _limit: 10,
      },
    });
    return data;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  },
});

export const selectBooks = (state: RootState) => state.books.data;

export default booksSlice.reducer;
