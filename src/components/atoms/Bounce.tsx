import './Bounce.scss';

import cx from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
}
const Bounce: React.FC<Props> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onHover = () => {
    if (timeoutRef.current) {
      return;
    }

    setIsHovered(true);
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      timeoutRef.current = null;
    }, 1000);
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    },
    [],
  );

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
