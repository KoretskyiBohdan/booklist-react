import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOnMount } from 'hooks/useOnMount';
import { useModal } from 'hooks/useModal';
import {
  deleteBook,
  fetchNextPage,
  selectBooks,
  selectHasMoreItemsToLoad,
} from 'store/books';
import BookRow from './BookRow';
import Button from 'components/Button';
import css from './books.module.scss';
import { BookType } from 'apiTypes';

const Books = () => {
  const [removed, serRemoved] = useState<Record<string, boolean>>({});
  const dispatch = useDispatch<any>();
  const { showAddNewModal, showEditModal } = useModal();
  const books = useSelector(selectBooks);
  const hasMoreItemsToLoad = useSelector(selectHasMoreItemsToLoad);

  const loadMoreBooks = useCallback(
    () => dispatch(fetchNextPage()),
    [dispatch]
  );

  const onChange = useCallback(
    (book: BookType) => showEditModal(book),
    [showEditModal]
  );

  const onDelete = useCallback(
    (book: BookType) => {
      serRemoved((s) => ({ ...s, [book.id]: true }));
      dispatch(deleteBook(book));
    },
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
                <Button type="primary" onClick={showAddNewModal}>
                  Add Book
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookRow
                key={book.id}
                book={book}
                isRemoved={removed[book.id]}
                onChange={onChange}
                onDelete={onDelete}
              />
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
