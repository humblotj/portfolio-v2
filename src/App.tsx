import { Suspense, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore/lite';

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import './App.scss';
import Loading from './components/organisms/Loading';
import MainSuspense from './pages/main/MainSuspense';
import WorkDetailSuspense from './pages/work-detail/WorkDetailSuspense';
import AboutMeSuspense from './pages/about-me/AboutMeSuspense';
import NotFoundSuspense from './pages/not-found/NotFoundSuspense';
import lazyWithRetry from './utils/lazyWithRetry';

gsap.registerPlugin(ScrollTrigger);

const firebaseConfig: FirebaseOptions = JSON.parse(
  process.env.REACT_APP_API_KEY || '',
);
initializeApp(firebaseConfig);
if (process.env.NODE_ENV !== 'development') {
  getAnalytics();
}
export const db = getFirestore();

const SideLeft = lazyWithRetry(() => import('./components/organisms/SideLeft'));
const Header = lazyWithRetry(() => import('./components/organisms/Header'));
const ScrollToTop = lazyWithRetry(
  () => import('./components/organisms/ScrollToTop'),
);

const App: React.FC<{}> = () => {
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
