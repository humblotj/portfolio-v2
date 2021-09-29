import {
  ReactNode, useEffect, useRef, useState,
} from 'react';
import cx from 'classnames';

import './Bounce.scss';

const Bounce = ({ children }: {children: ReactNode}) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onHover = () => {
    setIsHovered(true);
    timeoutRef.current = setTimeout(() => setIsHovered(false), 1000);
  };

  useEffect(() => () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return (
    <span
      className={cx('text-bounce', { bounce: isHovered })}
      onMouseEnter={onHover}
    >
      {children}
    </span>
  );
};

export default Bounce;
