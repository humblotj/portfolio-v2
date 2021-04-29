import {
  useContext,
  useEffect, useMemo, useRef, useState,
} from 'react';
import { gsap } from 'gsap';

import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import BurgerMenu from './ui/BurgerMenu';
import { StoreContext } from '../context/StoreProvider';

const Header = () => {
  const { store: { isInit, isLoading } } = useContext(StoreContext);
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const tl = useMemo(() => gsap.timeline(), []);

  const toggleNav = () => {
    setNavOpen((navOpen) => !navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isInit && (location.pathname === '/' && !location.state)) {
      const element = ref.current;
      if (!element || isLoading) {
        return;
      }

      tl.fromTo(element.querySelector('.wrapper-menu'),
        {
          autoAlpha: 0,
          pointerEvents: 'none',
        },
        {
          autoAlpha: 0.8,
          duration: 0.1,
          delay: 0.8 + 0.7 + 0.25 * 3,
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
  }, [location, isLoading]);

  return (
    <header ref={ref}>
      <BurgerMenu open={navOpen} toggleNav={toggleNav} />
      <Nav open={navOpen} onClose={closeNav} />
    </header>
  );
};

export default Header;
