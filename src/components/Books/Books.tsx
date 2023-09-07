import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, selectBooks } from 'store/booksSlice';

const Books = () => {
  const isInitialRenderRef = useRef(true);
  const dispatch = useDispatch<any>();
  const books = useSelector(selectBooks);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isInitialRenderRef.current) {
      dispatch(fetchBooks({ page }));
    }
    isInitialRenderRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>
            <button onClick={() => setPage(page + 1)}>Add book</button>
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
  );
};

export default Books;
