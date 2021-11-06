import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

import './Main.scss';
import { onInit, selectIsInit } from '../../store/store';
import Footer from '../../components/organisms/Footer';
import Contact from './contact/Contact';
import Home from './home/Home';
import Work from './work/Work';
import Experience from './experience/Experience';
import Strokes from '../../components/molecules/Strokes';
import Decks from './decks/Decks';

const Main: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(selectIsInit);
  const location = useLocation();
  const workRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollTo = () => {
      if (location.state && isInit) {
        if (location.state === 'work') {
          workRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        if (location.state === 'contact') {
          contactRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    scrollTo();
    document.querySelector('.wrapper-menu');
  }, [location, isInit]);

  useEffect(() => {
    if (!isInit) {
      dispatch(onInit());
    }

    const element = workRef.current!;
    gsap.fromTo(
      document.body.querySelectorAll('.line-menu'),
      {
        backgroundColor: '#fff',
      },
      {
        backgroundColor: '#000',
        scrollTrigger: {
          trigger: element,
          scrub: true,
          start: `${window.innerHeight - 50} bottom`,
          end: `+=50`,
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Strokes />
      <Home workRef={workRef} />
      <Decks ref={workRef} />
      <Work />
      <Experience />
      <Contact ref={contactRef} />
      <Footer />
    </>
  );
};

export default Main;
