import './App.scss';

import { getAnalytics } from 'firebase/analytics';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loading from 'components/organisms/Loading';
import useScrollToTop from 'hooks/useScrollToTop';
import lazyWithRetry from 'utils/lazyWithRetry';
import AboutMeSuspense from './pages/about-me/AboutMeSuspense';
import MainSuspense from './pages/main/MainSuspense';
import NotFoundSuspense from './pages/not-found/NotFoundSuspense';
import WorkDetailSuspense from './pages/work-detail/WorkDetailSuspense';

gsap.registerPlugin(ScrollTrigger);

if (!process.env.REACT_APP_API_KEY) {
  alert('Firebase key missing');
}
const firebaseConfig: FirebaseOptions = JSON.parse(
  process.env.REACT_APP_API_KEY || '{}',
);
initializeApp(firebaseConfig);
if (process.env.NODE_ENV !== 'development') {
  getAnalytics();
}
getFirestore();

const Header = lazyWithRetry(() => import('./components/organisms/Header'));

const App: React.FC<{}> = () => {
  const location = useLocation();
  useScrollToTop();

  useEffect(() => {
    document.body.classList.add('is-init');
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Routes>
        <Route
          path="/work/:id"
          element={<WorkDetailSuspense key={location.pathname} />}
        />
        <Route path="/" element={<MainSuspense />} />
        <Route path="*" element={<NotFoundSuspense />} />
      </Routes>
      <AboutMeSuspense />
    </Suspense>
  );
};

export default App;
