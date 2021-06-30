/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import './App.scss';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import SideLeft from './components/SideLeft';
import MainSuspense from './pages/main/MainSuspense';
import WorkDetailSuspense from './pages/work-detail/WorkDetailSuspense';
import AboutMeSuspense from './pages/about-me/AboutMeSuspense';
import NotFoundSuspense from './pages/not-found/NotFoundSuspense';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('is-init');
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />
      <SideLeft />
      <Switch>
        <Route path="/work/:id" key={location.pathname}>
          <WorkDetailSuspense />
        </Route>
        <Route path="/" exact>
          <MainSuspense />
        </Route>
        <Route>
          <NotFoundSuspense />
        </Route>
      </Switch>
      <AboutMeSuspense />
    </>
  );
};

export default App;
