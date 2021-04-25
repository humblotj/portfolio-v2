import { Link, useLocation } from 'react-router-dom';
import cx from 'classnames';

import './Nav.scss';
import { useContext } from 'react';
import FakeLink from './ui/FakeLink';
import { ReactComponent as GitHubIcon } from '../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../assets/icons/codepen.svg';
import { StoreContext } from '../context/StoreProvider';

interface Props {
  open: boolean,
  onClose: () => void
}

const Nav = ({ open, onClose }: Props) => {
  const { dispatch } = useContext(StoreContext);
  const location = useLocation();

  const onOpenContact = () => {
    onClose();
    dispatch({ type: 'SET_CONTACT_MODAL_OPEN', payload: true });
  };

  return (
    <div className={cx('nav-overlay', { open })}>
      <nav>
        <ul>
          <li>
            <Link
              to={{
                pathname: '/',
                state: { from: location.pathname },
              }}
              onClick={onClose}
              className={cx({
                active:
                location.pathname === '/'
                && location.hash === '',
              })}
            >
              <span data-content="Home" aria-hidden />
              Home
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: '/',
                hash: '#work',
                state: { from: location.pathname },
              }}
              onClick={onClose}
              className={cx({
                active:
                 location.pathname === '/'
                 && location.hash === '#work',
              })}
            >
              <span data-content="My work" aria-hidden />
              My work
            </Link>
          </li>
          <li>
            <FakeLink onClick={onOpenContact}>
              <span data-content="About me" aria-hidden />
              About me
            </FakeLink>
          </li>
          <li>
            <Link
              to={{
                pathname: '/',
                hash: '#contact',
                state: { from: location.pathname },
              }}
              onClick={onClose}
              className={cx({
                active:
                location.pathname === '/'
                && location.hash === '#contact',
              })}
            >
              <span data-content="Contact" aria-hidden />
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/jean-h-25b1871a0/" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </li>
        <li>
          <a href="https://github.com/humblotj" aria-label="Github">
            <GitHubIcon />
          </a>
        </li>
        <li>
          <a href="https://codepen.io/humblotj" aria-label="Codepen">
            <CodepenIcon />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
