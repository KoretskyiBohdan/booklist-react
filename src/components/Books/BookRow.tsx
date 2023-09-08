import { BookType } from 'apiTypes';
import css from './books.module.scss';

interface BookRowProps {
  book: BookType;
}

export const BookRow: React.FC<BookRowProps> = ({ book }) => {
  return (
    <tr key={book.id}>
      <td>{book.name}</td>
      <td>${book.price}</td>
      <td>{book.category}</td>
      <td>
        <button className={css.buttonDanger}>Delete</button>
      </td>
    </tr>
  );
};

export default BookRow;
