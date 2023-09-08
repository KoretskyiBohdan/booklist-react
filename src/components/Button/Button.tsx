import { MouseEvent } from 'react';
import css from './button.module.scss';

interface ButtonProps {
  type: 'primary' | 'secondary';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ type, onClick, children }) => {
  const className = type === 'primary' ? css.primary : css.secondary;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
