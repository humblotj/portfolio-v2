import { Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import './App.scss';
import Header from './components/Header';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';
import SideLeft from './components/SideLeft';
import Strokes from './components/Strokes';
import StoreProvider from './context/StoreProvider';
import AboutMe from './pages/about-me/AboutMe';
import useSuspenseAnimation from './hooks/useSuspenseAnimation';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const {
    DeferredComponent: Main,
    hasImportFinished: hasImportFinishedMain,
    enableComponent: enableComponentMain,
  } = useSuspenseAnimation(
    import('./pages/main/Main'),
  );
  const {
    DeferredComponent: WorkDetail,
    hasImportFinished: hasImportFinishedWork,
    enableComponent: enableComponentWork,
  } = useSuspenseAnimation(
    import('./pages/work-detail/WorkDetail'),
  );

  const location = useLocation();

  return (
    <>
      <StoreProvider>
        <ScrollToTop />
        <Header />
        <Strokes />
        <SideLeft />
        <Suspense fallback={(
          <Loading
            hasImportFinished={location.pathname === '/' ? hasImportFinishedMain : hasImportFinishedWork}
            enableComponent={location.pathname === '/' ? enableComponentMain : enableComponentWork}
          />
          )}
        >
          <Switch>
            <Route path="/work/:id" component={WorkDetail} />
            <Route path="/" component={Main} />
          </Switch>
        </Suspense>
        <AboutMe />
      </StoreProvider>
    </>
  );
};

export default App;
