import { MouseEvent, useCallback } from 'react';
import cn from 'classnames';
import { BookType } from 'apiTypes';
import Button from 'components/Button';
import css from './books.module.scss';

interface BookRowProps {
  book: BookType;
  isRemoved?: boolean;
  onChange: (book: BookType) => void;
  onDelete: (book: BookType) => void;
}

export const BookRow: React.FC<BookRowProps> = ({
  book,
  isRemoved = false,
  onChange,
  onDelete,
}) => {
  const onClickDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onDelete(book);
    },
    [book, onDelete]
  );

  return (
    <tr
      className={cn(css.bookRow, { isRemoved })}
      onClick={() => !isRemoved && onChange(book)}
      key={book.id}
    >
      <td>{book.name}</td>
      <td>${book.price}</td>
      <td>{book.category}</td>
      <td>
        <Button type="secondary" onClick={onClickDelete} disabled={isRemoved}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default BookRow;
