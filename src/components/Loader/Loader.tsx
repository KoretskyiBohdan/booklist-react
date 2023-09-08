import { ReactComponent as Icon } from 'icons/loader.svg';
import css from './loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={css.loader}>
      <Icon />
    </div>
  );
};

export default Loader;
