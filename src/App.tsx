/* eslint-disable react/jsx-props-no-spreading */
import { Suspense, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

import './App.scss';
import Loading from './components/Loading';
import MainSuspense from './pages/main/MainSuspense';
import WorkDetailSuspense from './pages/work-detail/WorkDetailSuspense';
import AboutMeSuspense from './pages/about-me/AboutMeSuspense';
import NotFoundSuspense from './pages/not-found/NotFoundSuspense';
import lazyWithRetry from './utils/lazyWithRetry';

const SideLeft = lazyWithRetry(() => import('./components/SideLeft'));
const Header = lazyWithRetry(() => import('./components/Header'));
const ScrollToTop = lazyWithRetry(() => import('./components/ScrollToTop'));

const firebaseConfig = JSON.parse(process.env.REACT_APP_API_KEY as any);
initializeApp(firebaseConfig);

export const db = getFirestore();
getAnalytics();

const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('is-init');
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <ScrollToTop />
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
    </Suspense>
  );
};

export default App;
