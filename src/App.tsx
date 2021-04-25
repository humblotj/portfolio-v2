import { Route, Switch } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import './App.scss';
import Header from './components/Header';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';
import SideLeft from './components/SideLeft';
import Strokes from './components/Strokes';
import StoreProvider from './context/StoreProvider';
import AboutContact from './pages/about-me/AboutContact';
import Main from './pages/main/Main';
import WorkDetail from './pages/work-detail/WorkDetail';

gsap.registerPlugin(ScrollTrigger);

const App = () => (
  <>
    <ScrollToTop />
    <StoreProvider>
      <Header />
      <Strokes />
      <SideLeft />
      <Loading />
      <Switch>
        <Route path="/work/:id">
          <WorkDetail />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
      <AboutContact />
    </StoreProvider>
  </>
);

export default App;
