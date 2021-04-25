import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';

import './SideLeft.scss';
import { ReactComponent as GitHubIcon } from '../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../assets/icons/codepen.svg';
import useInit from '../hooks/useInit';

const SideLeft = () => {
  const location = useLocation();
  const isInit = useInit();

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();
  const ref5 = useRef<any>();
  const ref6 = useRef<any>();

  useEffect(() => {
    if (!isInit || location.pathname === '/') {
      const refs = [ref1.current, ref2.current, ref3.current,
        ref4.current, ref5.current, ref6.current];
      const tl = gsap.timeline();

      tl.fromTo(refs,
        {
          autoAlpha: 0,
          pointerEvents: 'none',
        },
        {
          autoAlpha: 0.8,
          duration: 0.1,
          delay: 0.8 + 0.5 + 0.25 * 3,
          pointerEvents: 'none',
        });
      tl.to(refs,
        {
          autoAlpha: 0.1,
          duration: 0.1,
          pointerEvents: 'none',
        });
      tl.to(refs,
        {
          autoAlpha: 0.8,
          duration: 0.1,
          pointerEvents: 'none',
        });
      tl.to(refs,
        {
          autoAlpha: 0.2,
          duration: 0.2,
          pointerEvents: 'none',
        });
      tl.to(refs,
        {
          autoAlpha: 1,
          duration: 0.4,
          pointerEvents: 'auto',
        });
    }
  }, [location]);

  return (
    <>
      <div ref={ref1} className="side-left-sns linkedin">
        <a href="https://www.linkedin.com/in/jean-h-25b1871a0/" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
      </div>
      <div ref={ref2} className="side-left-sns github">
        <a href="https://github.com/humblotj" aria-label="Github">
          <GitHubIcon />
        </a>
      </div>
      <div ref={ref3} className="side-left-sns codepen">
        <a href="https://codepen.io/humblotj" aria-label="Codepen">
          <CodepenIcon />
        </a>
      </div>
      <div ref={ref4} className="side-left" />
      <div ref={ref5} className="side-right-mail">
        <a href="mailto:jhumblot1@gmail.com">jhumblot1@gmail.com</a>
      </div>
      <div ref={ref6} className="side-right" aria-hidden />
    </>
  );
};

export default SideLeft;
