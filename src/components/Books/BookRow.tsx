import { MouseEvent, useCallback } from 'react';
import { BookType } from 'apiTypes';
import Button from 'components/Button';
import css from './books.module.scss';

interface BookRowProps {
  book: BookType;
  onChange: (book: BookType) => void;
  onDelete: (book: BookType) => void;
}

export const BookRow: React.FC<BookRowProps> = ({
  book,
  onChange,
  onDelete,
}) => {
  const isRemoved = false;
  const onClickDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onDelete(book);
    },
    [book, onDelete]
  );

  return (
    <tr
      className={`${css.bookRow} ${isRemoved ? 'isRemoved' : ''}`}
      onClick={() => onChange(book)}
      key={book.id}
    >
      <td>{book.name}</td>
      <td>${book.price}</td>
      <td>{book.category}</td>
      <td>
        <Button type="secondary" onClick={onClickDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default BookRow;
