import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookType } from 'apiTypes';
import { useOnMount } from 'hooks/useOnMount';
import { useModal } from 'hooks/useModal';
import {
  deleteBook,
  fetchNextPage,
  selectBooks,
  selectHasMoreItemsToLoad,
  selectIsLoading,
} from 'store/books';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Skeleton from './Skeleton';
import BookRow from './BookRow';
import css from './books.module.scss';

const Books = () => {
  const dispatch = useDispatch<any>();
  const { showAddNewModal, showEditModal } = useModal();
  const [removed, serRemoved] = useState<Record<string, boolean>>({});
  const books = useSelector(selectBooks);
  const hasMoreItemsToLoad = useSelector(selectHasMoreItemsToLoad);
  const isLoading = useSelector(selectIsLoading);
  const showSkeleton = books.length === 0 && isLoading;

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
        {showSkeleton && <Skeleton />}
        <div className={css.loadMore}>
          {hasMoreItemsToLoad && !isLoading && (
            <Button type="primary" onClick={loadMoreBooks}>
              Load More
            </Button>
          )}
          {isLoading && !showSkeleton && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Books;
