import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Footer from '../../components/Footer';
import { onInit, selectIsInit } from '../../store/store';
import Contact from '../contact/Contact';
import Home from '../home/Home';
import Work from '../work/Work';

const Main = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(selectIsInit);
  const location = useLocation();
  const workRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    scrollTo();
    document.querySelector('.wrapper-menu');
  }, [location]);

  useEffect(() => {
    if (!isInit) {
      dispatch(onInit());
    }
  }, []);

  return (
    <>
      <Home workRef={workRef} />
      <Work ref={workRef} />
      <Contact ref={contactRef} />
      <Footer />
    </>
  );
};

export default Main;
