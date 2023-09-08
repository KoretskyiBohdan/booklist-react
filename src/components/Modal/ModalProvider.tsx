import { useCallback, useState } from 'react';
import { ModalContext } from './ModalContext';
import Modal from './Modal';

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const show = useCallback((markup?: React.ReactNode) => {
    setContent(markup);
    setIsOpen(true);
  }, []);

  const hide = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ show, hide }}>
      <Modal isOpen={isOpen} content={content} hide={hide} />
      {children}
    </ModalContext.Provider>
  );
};
