import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOnMount } from 'hooks/useOnMount';
import { useModal } from 'hooks/useModal';
import {
  fetchNextPage,
  selectBooks,
  selectHasMoreItemsToLoad,
} from 'store/books';
import BookRow from './BookRow';
import css from './books.module.scss';

const Books = () => {
  const dispatch = useDispatch<any>();
  const modal = useModal();
  const books = useSelector(selectBooks);
  const hasMoreItemsToLoad = useSelector(selectHasMoreItemsToLoad);

  const loadMoreBooks = useCallback(
    () => dispatch(fetchNextPage()),
    [dispatch]
  );

  const addBook = useCallback(() => {
    modal.show(<div>Hi from modal</div>);
  }, [modal]);

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
                <button className={css.buttonPrimary} onClick={addBook}>
                  Add book
                </button>
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
            <button className={css.buttonPrimary} onClick={loadMoreBooks}>
              Load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
