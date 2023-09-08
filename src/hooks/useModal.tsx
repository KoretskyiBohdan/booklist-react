import { useContext, useCallback } from 'react';
import { ModalContext } from 'components/Modal/ModalContext';

export const useModal = () => {
  const { show } = useContext(ModalContext);

  const showAddNewModal = useCallback(() => {
    show(<div>There will be add new Modal</div>);
  }, [show]);

  const showEditModal = useCallback(() => {
    show(<div>There will be edit Modal</div>);
  }, [show]);

  return { showAddNewModal, showEditModal };
};
