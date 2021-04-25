import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { gsap } from 'gsap';

import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import BurgerMenu from './ui/BurgerMenu';
import useInit from '../hooks/useInit';

const Header = () => {
  const location = useLocation();
  const isInit = useInit();
  const [navOpen, setNavOpen] = useState(false);
  const tl = useMemo(() => gsap.timeline(), []);

  const toggleNav = () => {
    setNavOpen((navOpen) => !navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const ref = useRef<any>();

  useEffect(() => {
    if (!isInit || (location.pathname === '/' && (location.state as any)?.from !== '/')) {
      const element = ref.current;
      tl.fromTo(element.querySelector('.wrapper-menu'),
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
      tl.to(element.querySelector('.wrapper-menu'),
        {
          autoAlpha: 0.1,
          duration: 0.1,
          pointerEvents: 'none',
        });
      tl.to(element.querySelector('.wrapper-menu'),
        {
          autoAlpha: 0.8,
          duration: 0.1,
          pointerEvents: 'none',
        });
      tl.to(element.querySelector('.wrapper-menu'),
        {
          autoAlpha: 0.2,
          duration: 0.2,
          pointerEvents: 'none',
        });
      tl.to(element.querySelector('.wrapper-menu'),
        {
          autoAlpha: 1,
          duration: 0.4,
          pointerEvents: 'auto',
        });
    }
  }, [location]);

  return (
    <header ref={ref}>
      <BurgerMenu open={navOpen} toggleNav={toggleNav} />
      <Nav open={navOpen} onClose={closeNav} />
    </header>
  );
};

export default Header;
