/* eslint-disable react/jsx-props-no-spreading */
import { Route, Switch, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/analytics';

import './App.scss';
import store from './store/store';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import SideLeft from './components/SideLeft';
import Strokes from './components/Strokes';
import AboutMe from './pages/about-me/AboutMe';
import MainSuspense from './pages/main/MainSuspense';
import WorkDetailSuspense from './pages/work-detail/WorkDetailSuspense';
import NotFoundSuspense from './pages/not-found/NotFoundSuspense';

gsap.registerPlugin(ScrollTrigger);

const config = JSON.parse(process.env.REACT_APP_API_KEY as any);

firebase.initializeApp({
  ...config,
});
export const db = firebase.firestore();

if (process.env.NODE_ENV !== 'development') {
  firebase.analytics();
}

const App = () => {
  const location = useLocation();

  return (
    <Provider store={store}>
      <ScrollToTop />
      <Header />
      <Strokes />
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
      <AboutMe />
    </Provider>
  );
};

export default App;
