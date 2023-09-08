import { MouseEvent, useCallback, useRef } from 'react';
import cn from 'classnames';
import css from './modal.module.scss';

export interface ModalProps {
  isOpen: boolean;
  hide: () => void;
  content?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, hide, content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const onClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === containerRef.current) hide();
    },
    [hide]
  );

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={cn(css.modal, { [css.open]: isOpen })}
    >
      <div className={css.content}>
        <span className={css.closeButton} onClick={hide}>
          &times;
        </span>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
