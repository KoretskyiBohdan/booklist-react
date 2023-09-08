import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOnMount } from 'hooks/useOnMount';
import { useAddBookModal } from 'hooks/useAddBookModal';
import {
  fetchNextPage,
  selectBooks,
  selectHasMoreItemsToLoad,
} from 'store/books';
import BookRow from './BookRow';
import Button from 'components/Button';
import css from './books.module.scss';

const Books = () => {
  const dispatch = useDispatch<any>();
  const { showModal } = useAddBookModal();
  const books = useSelector(selectBooks);
  const hasMoreItemsToLoad = useSelector(selectHasMoreItemsToLoad);

  const loadMoreBooks = useCallback(
    () => dispatch(fetchNextPage()),
    [dispatch]
  );

  useOnMount(loadMoreBooks);

  return (
    <div className={css.container}>
      <div>
        <table className={css.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>
                <Button type="primary" onClick={showModal}>
                  Add Book
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookRow key={book.id} book={book} />
            ))}
          </tbody>
        </table>
        <div className={css.loadMore}>
          {hasMoreItemsToLoad && (
            <Button type="primary" onClick={loadMoreBooks}>
              Load More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
