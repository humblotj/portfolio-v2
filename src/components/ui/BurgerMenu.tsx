import cx from 'classnames';

import './BurgerMenu.scss';

interface Props {
  open: boolean,
  toggleNav: () => void
}

const BurgerMenu = ({ open, toggleNav }: Props) => (
  <button
    type="button"
    className={cx('wrapper-menu', 'blink', { open })}
    onClick={toggleNav}
    aria-pressed={open}
    aria-label="burger-menu"
    data-top="30"
  >
    <div className="line-menu half start" />
    <div className="line-menu" />
    <div className="line-menu half end" />
  </button>
);

export default BurgerMenu;
