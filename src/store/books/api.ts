import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';
import { BookType } from 'apiTypes';
import { selectHasMoreItemsToLoad, selectPage } from './selectors';
import { incrementPage } from './slice';

const API_LIMIT = 10;

export const fetchNextPage = createAsyncThunk<
  BookType[],
  void,
  { state: RootState }
>('books/fetch', async (_, { getState, dispatch }) => {
  const page = selectPage(getState());
  const hasMoreItemsToLoad = selectHasMoreItemsToLoad(getState());

  if (!hasMoreItemsToLoad) return [];

  const { data } = await axios<BookType[]>({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/books`,
    params: {
      _page: page,
      _limit: API_LIMIT,
    },
  });

  dispatch(incrementPage());

  return data;
});

export const addNewBook = createAsyncThunk<
  BookType,
  Omit<BookType, 'id'>,
  { state: RootState }
>('books/add', async (payload) => {
  const { data } = await axios<BookType>({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/books`,
    data: payload,
  });

  return data;
});

export const updateBook = createAsyncThunk<BookType, BookType>(
  'books/update',
  async (payload) => {
    const { data } = await axios<BookType>({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/books/${payload.id}`,
      data: payload,
    });

    return data;
  }
);
