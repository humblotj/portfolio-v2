import './WhatIDoFast.scss';

import cx from 'classnames';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

import FastClock100 from 'assets/fast-clock-100.png';
import FastClock200 from 'assets/fast-clock-200.png';
import FastClock300 from 'assets/fast-clock-300.png';

const useAnimateOnEnter = (ref: React.RefObject<HTMLLIElement>) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ref.current!,
      start: '50% bottom',
      onEnter: () => {
        if (timeoutRef.current) {
          return;
        }
        setTimeout(() => {
          setIsBouncing(true);
          timeoutRef.current = setTimeout(() => {
            setIsBouncing(false);
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

  return isBouncing;
};

const WhatIDoFast = () => {
  const ref = useRef<HTMLLIElement>(null);
  const isBouncing = useAnimateOnEnter(ref);

  return (
    <li ref={ref} className="what-i-do-fast">
      <h3 className="heading">In a short time</h3>
      <p>MVP in weeks not in months!</p>
      <img
        data-src={FastClock300}
        data-srcset={`${FastClock100} 100w, ${FastClock200} 200w, ${FastClock300} 300w`}
        alt="fast-clock"
        className={cx('lazyload', { bounce: isBouncing })}
        width={300}
        height={318}
      />
    </li>
  );
};

export default WhatIDoFast;
