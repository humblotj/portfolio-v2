import { useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../../components/Footer';
import { StoreContext } from '../../context/StoreProvider';
import Contact from '../contact/Contact';
import Home from '../home/Home';
import Work from '../work/Work';

const Main = () => {
  const { store: { isInit }, dispatch } = useContext(StoreContext);
  const location = useLocation();
  const workRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (location.state && isInit) {
      if (location.state === 'work') {
        workRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if (location.state === 'contact') {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    if (!isInit) {
      dispatch({ type: 'ON_INIT', payload: null });
    }
    dispatch({ type: 'SET_IS_LOADING', payload: false });
  }, []);

  return (
    <>
      <Home />
      <Work ref={workRef} />
      <Contact ref={contactRef} />
      <Footer />
    </>
  );
};

export default Main;
