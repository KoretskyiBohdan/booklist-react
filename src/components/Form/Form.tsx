import {
  useRef,
  useState,
  useCallback,
  MouseEvent,
  Children,
  isValidElement,
  ReactElement,
  cloneElement,
} from 'react';
import Button from 'components/Button';
import Input, { InputProps } from './Input';
import css from './form.module.scss';

interface FormProps {
  title: string;
  buttonText: string;
  children: React.ReactNode;
  onSubmit: (values: Record<string, string>) => void;
}

type FormType = React.FC<FormProps> & { Input: typeof Input };

const isInputElement = (child: any): child is ReactElement<InputProps> => {
  return isValidElement(child) && child.type === Input;
};

export const Form: FormType = ({ title, buttonText, children, onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const onBlur = useCallback(() => setInvalidFields([]), []);

  const onClickSubmit = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (!formRef.current) return;

      const formData = new FormData(formRef.current);
      const formProps: Record<string, string> = {};
      const invalid: string[] = [];

      Children.forEach(children, (child) => {
        if (!isInputElement(child)) return;
        const { name, required } = child.props;

        formProps[name] = formData.get(name) as string;

        if (required && !formProps[name]) invalid.push(name);
      });

      setInvalidFields(invalid);

      if (invalid.length === 0) onSubmit(formProps);
    },
    [children, onSubmit]
  );

  return (
    <form className={css.form} ref={formRef} onBlur={onBlur}>
      <h2>
        <p>{title}</p>
      </h2>
      {Children.map(children, (child) => {
        if (isInputElement(child)) {
          const { name } = child.props;
          return cloneElement(child, { invalid: invalidFields.includes(name) });
        }
        return child;
      })}
      <div className={css.submit}>
        <Button type="primary" onClick={onClickSubmit}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

Form.Input = Input;

export default Form;
