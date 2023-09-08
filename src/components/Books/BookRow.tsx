import { BookType } from 'apiTypes';
import Button from 'components/Button';

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
        <Button type="secondary" onClick={() => console.log('delete')}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default BookRow;
