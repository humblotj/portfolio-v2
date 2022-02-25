import './Main.scss';

import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Strokes from 'components/molecules/Strokes';
import Footer from 'components/organisms/Footer';
import useDispatchInit from 'hooks/useDispatchInit';
import { selectIsInit } from 'store/store';
import Contact from './contact/Contact';
import Decks from './decks/Decks';
import Experience from './experience/Experience';
import Home from './home/Home';
import WhatIDo from './what-i-do/WhatIDo';
import Work from './work/Work';

const useScrollOnLocationChange = ({
  whatIDoRef,
  workRef,
  contactRef,
}: {
  whatIDoRef: React.RefObject<HTMLElement>;
  workRef: React.RefObject<HTMLElement>;
  contactRef: React.RefObject<HTMLElement>;
}) => {
  const location = useLocation();
  const isInit = useSelector(selectIsInit);

  useEffect(() => {
    const scrollTo = () => {
      if (!location.state || !isInit) {
        return;
      }

      switch (location.state) {
        case 'home':
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          break;
        case 'what-i-do':
          whatIDoRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'work':
          workRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'contact':
          contactRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        default:
          break;
      }
    };

    scrollTo();
  }, [location]);
};

const useAnimateBurgerMenuColor = (
  whatIDoRef: React.RefObject<HTMLElement>,
) => {
  useEffect(() => {
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
};

const Main: React.FC<{}> = () => {
  const whatIDoRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  useDispatchInit();
  useScrollOnLocationChange({ whatIDoRef, workRef, contactRef });
  useAnimateBurgerMenuColor(whatIDoRef);

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
