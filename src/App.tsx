import { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore/lite';

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import './App.scss';
import useScrollToTop from './hooks/useScrollToTop';
import Loading from './components/organisms/Loading';
import MainSuspense from './pages/main/MainSuspense';
import WorkDetailSuspense from './pages/work-detail/WorkDetailSuspense';
import AboutMeSuspense from './pages/about-me/AboutMeSuspense';
import NotFoundSuspense from './pages/not-found/NotFoundSuspense';
import lazyWithRetry from './utils/lazyWithRetry';

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
