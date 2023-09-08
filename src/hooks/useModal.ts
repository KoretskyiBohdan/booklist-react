import { ModalContext } from 'components/Modal/ModalContext';
import { useContext } from 'react';

export const useModal = () => {
  const modalContext = useContext(ModalContext);
  return modalContext;
};
