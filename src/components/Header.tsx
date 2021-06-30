import { useState } from 'react';

import Nav from './Nav';
import BurgerMenu from './ui/BurgerMenu';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen((navOpen) => !navOpen);
  const closeNav = () => setNavOpen(false);

  return (
    <header>
      <BurgerMenu open={navOpen} toggleNav={toggleNav} />
      <Nav open={navOpen} onClose={closeNav} />
    </header>
  );
};

export default Header;
