import css from './form.module.scss';

export interface InputProps {
  label: string;
  name: string;
  type?: string;
  invalid?: boolean;
  placaholder?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  name,
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
        className={`${css.inputField} ${invalid ? 'invalid' : ''}`}
        type={type}
        id={name}
        name={name}
      ></input>
    </div>
  );
};

export default Input;
