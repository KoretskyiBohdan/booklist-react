import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOnMount } from 'hooks/useOnMount';
import {
  fetchNextPage,
  selectBooks,
  selectHasMoreItemsToLoad,
} from 'store/books';

const Books = () => {
  const dispatch = useDispatch<any>();
  const books = useSelector(selectBooks);
  const hasMoreItemsToLoad = useSelector(selectHasMoreItemsToLoad);

  const loadMoreBooks = useCallback(
    () => dispatch(fetchNextPage()),
    [dispatch]
  );

  useOnMount(loadMoreBooks);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>
              <button onClick={() => console.log('add book')}>Add book</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.name}</td>
                <td>{book.category}</td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {hasMoreItemsToLoad && <button onClick={loadMoreBooks}>Load more</button>}
    </div>
  );
};

export default Books;
