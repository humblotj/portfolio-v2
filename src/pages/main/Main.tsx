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
import WhatIDo from './what-i-do/WhatIDo';

const Main: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(selectIsInit);
  const location = useLocation();
  const whatIDoRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollTo = () => {
      if (!location.state || !isInit) {
        return;
      }

      if (location.state === 'home') {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
      if (location.state === 'what-i-do') {
        whatIDoRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if (location.state === 'work') {
        workRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if (location.state === 'contact') {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    scrollTo();
  }, [location, isInit]);

  useEffect(() => {
    if (!isInit) {
      dispatch(onInit());
    }

    const element = whatIDoRef.current!;
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
  }, []);

  return (
    <>
      <Strokes />
      <Home whatIDoRef={whatIDoRef} />
      <WhatIDo ref={whatIDoRef} />
      <Decks ref={workRef} />
      <Work />
      <Experience />
      <Contact ref={contactRef} />
      <Footer />
    </>
  );
};

export default Main;
