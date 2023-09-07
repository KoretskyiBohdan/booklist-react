import { useRef, useEffect } from 'react';

export const useOnMount = (cb: () => void) => {
  const isItFirstMountRef = useRef(true);

  useEffect(() => {
    if (isItFirstMountRef.current) cb();

    isItFirstMountRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
