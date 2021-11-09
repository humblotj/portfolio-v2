import { useEffect, useRef, useState } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import cx from 'classnames';

import './WhatIDoFast.scss';
import FastClock from '../../../../assets/fast-clock.png';

const WhatIDoFast = () => {
  const ref = useRef<HTMLLIElement>(null);
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ref.current!,
      start: '50% bottom',
      onEnter: () => {
        if (timeoutRef.current) {
          return;
        }
        setTimeout(() => {
          setIsActive(true);
          timeoutRef.current = setTimeout(() => {
            setIsActive(false);
            timeoutRef.current = null;
          }, 1000);
        }, 300);
      },
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  return (
    <li ref={ref} className="what-i-do-fast">
      <h3 className="heading">In a short time</h3>
      <p>MVP in weeks not in months!</p>
      <img
        src={FastClock}
        alt="fast-clock"
        className={cx({ bounce: isActive })}
      />
    </li>
  );
};

export default WhatIDoFast;
