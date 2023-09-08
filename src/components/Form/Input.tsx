import cn from 'classnames';
import css from './form.module.scss';

export interface InputProps {
  label?: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  invalid?: boolean;
  placaholder?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  defaultValue = '',
  type = 'text',
  invalid = false,
  required = false,
}) => {
  return (
    <div className={css.inputWrapper}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      {required && <span className={css.required}>*</span>}
      <input
        className={cn(css.inputField, { invalid })}
        defaultValue={defaultValue}
        type={type}
        id={name}
        name={name}
      ></input>
    </div>
  );
};

export default Input;
