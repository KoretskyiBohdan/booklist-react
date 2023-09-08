import { MouseEvent, useCallback } from 'react';
import { BookType } from 'apiTypes';
import Button from 'components/Button';
import { useModal } from 'hooks/useModal';
import css from './books.module.scss';

interface BookRowProps {
  book: BookType;
}

export const BookRow: React.FC<BookRowProps> = ({ book }) => {
  const { showEditModal } = useModal();

  const onClickChange = useCallback(
    () => showEditModal(book),
    [book, showEditModal]
  );

  const onClickDelete = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <tr className={css.bookRow} onClick={onClickChange} key={book.id}>
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
