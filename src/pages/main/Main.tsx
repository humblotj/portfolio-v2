import { createRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../../components/Footer';
import Contact from '../contact/Contact';
import Home from '../home/Home';
import Work from '../work/Work';

const Main = () => {
  const workRef = createRef<HTMLDivElement>();
  const contactRef = createRef<HTMLDivElement>();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      if (location.hash === '#work') {
        workRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if (location.hash === '#contact') {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

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
