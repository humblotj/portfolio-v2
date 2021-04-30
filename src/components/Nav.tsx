import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import cx from 'classnames';

import './Nav.scss';
import { useContext, useEffect, useRef } from 'react';
import FakeLink from './ui/FakeLink';
import { ReactComponent as GitHubIcon } from '../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../assets/icons/codepen.svg';
import { StoreContext } from '../context/StoreProvider';
import Strokes from './Strokes';

interface Props {
  open: boolean,
  onClose: () => void
}

const tl = gsap.timeline();

const Nav = ({ open, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { dispatch } = useContext(StoreContext);
  const location = useLocation();

  const onOpenContact = () => {
    onClose();
    dispatch({ type: 'SET_CONTACT_MODAL_OPEN', payload: true });
  };

  useEffect(() => {
    if (open) {
      const element = ref.current;
      if (!element) {
        return;
      }

      const items = element.querySelectorAll('nav li');
      for (let i = 0; i < items.length; i++) {
        tl.fromTo(
          items[i],
          {
            opacity: 0,
            x: '100%',
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: i * 0.15 + 0.35,
          },
          'nav',
        );
      }
      tl.addLabel('nav');

      const sns = element.querySelectorAll('.sns li');
      for (let i = 0; i < sns.length; i++) {
        tl.fromTo(
          sns[i],
          {
            opacity: 0,
            y: '50%',
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.15,
          },
          'sns',
        );
      }
      tl.addLabel('sns');
    } else {
      tl.clear();
    }
  }, [open]);

  return (
    <div ref={ref} className={cx('nav-overlay', { open })}>
      <Strokes />
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              onClick={onClose}
            >
              <span data-content="Home" aria-hidden />
              Home
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: '/',
                state: 'work',
              }}
              onClick={onClose}
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
                state: 'contact',
              }}
              onClick={onClose}
            >
              <span data-content="Contact" aria-hidden />
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <ul className="sns">
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
