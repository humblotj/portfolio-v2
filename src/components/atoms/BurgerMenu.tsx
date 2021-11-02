import { useLocation } from 'react-router-dom';
import cx from 'classnames';

import './BurgerMenu.scss';
interface Props {
  open: boolean;
  toggleNav: () => void;
}

const BurgerMenu: React.FC<Props> = ({ open, toggleNav }) => {
  const location = useLocation();

  return (
    <button
      type="button"
      className={cx(
        'wrapper-menu',
        'blink',
        { open },
        { work: location.pathname.indexOf('work') !== -1 },
      )}
      onClick={toggleNav}
      aria-pressed={open}
      aria-label="burger-menu"
    >
      <div className="line-menu half start" />
      <div className="line-menu" />
      <div className="line-menu half end" />
    </button>
  );
};

export default BurgerMenu;
