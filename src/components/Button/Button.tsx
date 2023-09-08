import { MouseEvent } from 'react';
import cn from 'classnames';
import css from './button.module.scss';

interface ButtonProps {
  type: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  disabled,
  onClick,
  children,
}) => {
  return (
    <button
      className={cn({
        [css.primary]: type === 'primary',
        [css.secondary]: type === 'secondary',
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
