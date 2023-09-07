import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, selectBooks } from 'store/booksSlice';

const Books = () => {
  const dispatch = useDispatch<any>();
  const books = useSelector(selectBooks);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  console.log(books);

  return null;
};

export default Books;
