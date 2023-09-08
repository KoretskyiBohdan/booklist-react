import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import css from './modal.module.scss';

export interface ModalProps {
  isOpen: boolean;
  hide: () => void;
  content?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, hide, content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentClasses, setContentClasses] = useState([css.content]);
  const containerClassName = [css.modal, isOpen ? css.open : ''].join(' ');

  const onClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === containerRef.current) hide();
    },
    [hide]
  );

  useEffect(() => {
    setContentClasses((state) => state.concat([css.contentAnimation]));
  }, []);

  return (
    <div ref={containerRef} onClick={onClick} className={containerClassName}>
      <div className={contentClasses.join(' ')}>
        <span className={css.closeButton} onClick={hide}>
          &times;
        </span>
        <div className={css.innerContent}>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
