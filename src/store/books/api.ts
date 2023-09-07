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
    url: `${process.env.REACT_APP_API_URL}/books`,
    params: {
      _page: page,
      _limit: API_LIMIT,
    },
  });

  dispatch(incrementPage());

  return data;
});
