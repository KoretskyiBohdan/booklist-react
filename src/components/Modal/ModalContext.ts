import { createContext } from 'react';

const noop = () => void 0;

type ShowFn = {
  (content?: React.ReactNode): void;
};

type hideFn = {
  (): void;
};

export const ModalContext = createContext<{ show: ShowFn; hide: hideFn }>({
  show: noop,
  hide: noop,
});
