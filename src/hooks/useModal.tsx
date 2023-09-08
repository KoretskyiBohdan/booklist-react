import { useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ModalContext } from 'components/Modal/ModalContext';
import Form from 'components/Form';
import { addNewBook } from 'store/books';

export const useModal = () => {
  const dispatch = useDispatch<any>();
  const { show, hide } = useContext(ModalContext);

  const onAddBook = useCallback(
    (data: Record<string, string>) => {
      const book = {
        name: data.name,
        price: Number(data.price),
        category: data.category,
        description: data.description,
      };
      dispatch(addNewBook(book));
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

  const showEditModal = useCallback(() => {
    show(<div>There will be edit Modal</div>);
  }, [show]);

  return { showAddNewModal, showEditModal };
};
