import { useMemo } from 'react';
import css from './books.module.scss';

interface SkeletonProps {
  size?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ size = 10 }) => {
  const blocks = useMemo(() => {
    return new Array(size).fill(null).map((_, i) => <p key={i} />);
  }, [size]);

  return <div className={css.skeleton}>{blocks}</div>;
};

export default Skeleton;
