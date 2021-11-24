import { useState, memo } from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';

import Nav from './Nav';
import BurgerMenu from '../atoms/BurgerMenu';

const Header: React.FC<{}> = () => {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((navOpen) => !navOpen);
  const closeNav = () => setNavOpen(false);

  return (
    <header className={cx({ 'is-main': location.pathname === '/' })}>
      <BurgerMenu open={navOpen} toggleNav={toggleNav} />
      <Nav open={navOpen} onClose={closeNav} />
    </header>
  );
};

export default memo(Header);
