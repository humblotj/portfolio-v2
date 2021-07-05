import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import cx from 'classnames';

import './Nav.scss';
import { ReactComponent as GitHubIcon } from '../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../assets/icons/codepen.svg';
import FakeLink from './ui/FakeLink';
import Strokes from './Strokes';
import { onToggleAboutModal } from '../store/store';

interface Props {
  open: boolean,
  onClose: () => void
}

const Nav = ({ open, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const tlRef = useRef(gsap.timeline());
  const [animationEnded, setAnimationEnded] = useState(false);

  const onOpenContact = () => {
    onClose();
    dispatch(onToggleAboutModal(true));
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = open ? 'hidden' : '';
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const tl = tlRef.current;
    tl.clear();

    if (open) {
      tl.to(
        [element, ...element.querySelectorAll('.strokes')],
        {
          opacity: 1,
          height: '100%',
          duration: 0.35,
        },
      );

      const items = element.querySelectorAll('nav li');
      for (let i = 0; i < items.length; i++) {
        tl.from(items[i],
          {
            opacity: 0,
            x: '100%',
            duration: 0.5,
          },
          0.35 + i * 0.15);
      }

      const sns = element.querySelectorAll('.sns li');
      for (let i = 0; i < sns.length; i++) {
        tl.from(sns[i],
          {
            opacity: 0,
            y: '50%',
            delay: i * 0.15,
            duration: 0.5,
          },
          'sns');
      }
      tl.addLabel('sns');
    } else {
      setAnimationEnded(false);
      tl.to(
        [element, ...element.querySelectorAll('.strokes')],
        {
          opacity: 0,
          height: 0,
          duration: 0.35,
        },
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div ref={ref} className={cx('nav-overlay', { opened: animationEnded })} data-top="0">
      <Strokes />
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={onClose}>
              <span data-content="Home" aria-hidden />
              Home
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/', state: 'work' }} onClick={onClose}>
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
            <Link to={{ pathname: '/', state: 'contact' }} onClick={onClose}>
              <span data-content="Contact" aria-hidden />
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <ul className="sns">
        <li>
          <a href="https://www.linkedin.com/in/humblotj/" aria-label="LinkedIn">
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
