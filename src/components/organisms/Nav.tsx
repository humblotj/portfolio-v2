import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import cx from 'classnames';

import './Nav.scss';
import { ReactComponent as GitHubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../../assets/icons/codepen.svg';
import FakeLink from '../atoms/FakeLink';
import Strokes from '../molecules/Strokes';
import { onToggleAboutModal } from '../../store/store';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Nav: React.FC<Props> = ({ open, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(ref);
  const dispatch = useDispatch();
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
      return () => {};
    }

    const tl = gsap.timeline();

    if (open) {
      tl.to([element, ...q('.strokes')], {
        opacity: 1,
        height: '100%',
        duration: 0.35,
      });

      tl.fromTo(
        q('nav li'),
        { opacity: 0, x: '100%' },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.15 },
        '>=0.15',
      );

      tl.fromTo(
        q('.sns li'),
        { opacity: 0, y: '50%' },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
        },
      );
    } else {
      setAnimationEnded(false);
      tl.to([element, ...q('.strokes')], {
        opacity: 0,
        height: 0,
        duration: 0.35,
      });
    }

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div
      ref={ref}
      className={cx('nav-overlay', { opened: animationEnded })}
      data-top="0"
    >
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
