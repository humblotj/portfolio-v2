import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';

import './Nav.scss';
import FakeLink from '../atoms/FakeLink';
import Strokes from '../molecules/Strokes';
import Sns from './Sns';
import { onToggleAboutModal } from '../../store/store';

interface Props {
  open: boolean;
  onClose: () => void;
}

const Nav: React.FC<Props> = ({ open, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(ref);
  const dispatch = useDispatch();

  const onOpenContact = () => {
    onClose();
    dispatch(onToggleAboutModal(true));
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = open ? 'hidden' : '';
    }

    const element = ref.current;
    const tl = gsap.timeline();

    if (open) {
      tl.to([element, ...q('.strokes')], {
        height: '100%',
        duration: 0.35,
      });

      tl.fromTo(
        q('.links li'),
        { opacity: 0, x: '100%' },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.15 },
        '>=0.15',
      );

      tl.fromTo(
        q('.sns li'),
        { opacity: 0, y: '50%' },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.15,
        },
      );
    } else {
      tl.to([element, ...q('.strokes')], {
        height: 0,
        duration: 0.35,
      });
    }

    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <nav ref={ref} className="nav-overlay">
      <Strokes />
      <ul className="links">
        <li>
          <Link to="/" state="home" onClick={onClose}>
            <span data-content="Home" aria-hidden />
            Home
          </Link>
        </li>
        <li>
          <FakeLink onClick={onOpenContact}>
            <span data-content="About me" aria-hidden />
            About me
          </FakeLink>
        </li>
        <li>
          <Link to="/" state="what-i-do" onClick={onClose}>
            <span data-content="What I do" aria-hidden />
            What I do
          </Link>
        </li>
        <li>
          <Link to="/" state="work" onClick={onClose}>
            <span data-content="My work" aria-hidden />
            My work
          </Link>
        </li>
        <li>
          <Link to="/" state="contact" onClick={onClose}>
            <span data-content="Contact" aria-hidden />
            Contact
          </Link>
        </li>
      </ul>
      <Sns />
    </nav>
  );
};

export default Nav;
