import { MouseEvent, useCallback } from 'react';
import { useModal } from './useModal';

export const useAddBookModal = () => {
  const { show } = useModal();

  const onSave = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const showModal = useCallback(() => {
    show(
      <div>
        <form>
          <p>New book</p>
          <div>
            <label>Name:</label>
            <input type="text"></input>
          </div>
          <div>
            <label>Price</label>
            <input type="number"></input>
          </div>
          <div>
            <label>Description:</label>
            <input type="text"></input>
          </div>
          <div>
            <label>Category:</label>
            <input type="text"></input>
          </div>

          <div>
            <button type="submit" onClick={onSave}>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }, [show]);

  return { showModal };
};
