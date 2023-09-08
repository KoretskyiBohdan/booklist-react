import { useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ModalContext } from 'components/Modal/ModalContext';
import Form from 'components/Form';
import { addNewBook, updateBook } from 'store/books';
import { BookType } from 'apiTypes';
import { formValuesToBookData } from 'utils';

export const useModal = () => {
  const dispatch = useDispatch<any>();
  const { show, hide } = useContext(ModalContext);

  const onAddBook = useCallback(
    (data: Record<string, string>) => {
      const book = formValuesToBookData(data);
      dispatch(addNewBook(book));
      hide();
    },
    [dispatch, hide]
  );

  const onChangeBook = useCallback(
    (data: Record<string, string>) => {
      const book = formValuesToBookData(data) as BookType;
      dispatch(updateBook(book));
      hide();
    },
    [dispatch, hide]
  );

  const showAddNewModal = useCallback(() => {
    show(
      <Form title="Add new" buttonText="Save" onSubmit={onAddBook}>
        <Form.Input name="name" label="Name:" required />
        <Form.Input name="price" label="Price:" type="number" required />
        <Form.Input name="category" label="Category:" required />
        <Form.Input name="description" label="Description:" required />
      </Form>
    );
  }, [onAddBook, show]);

  const showEditModal = useCallback(
    (data: BookType) => {
      show(
        <Form title="Change" buttonText="Save" onSubmit={onChangeBook}>
          <Form.Input name="id" type="hidden" defaultValue={data.id} />
          <Form.Input
            name="name"
            label="Name:"
            defaultValue={data.name}
            required
          />
          <Form.Input
            name="price"
            label="Price:"
            type="number"
            defaultValue={data.price}
            required
          />
          <Form.Input
            name="category"
            label="Category:"
            defaultValue={data.category}
            required
          />
          <Form.Input
            name="description"
            label="Description:"
            defaultValue={data.description}
            required
          />
        </Form>
      );
    },
    [onChangeBook, show]
  );

  return { showAddNewModal, showEditModal };
};
