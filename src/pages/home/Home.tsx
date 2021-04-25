import {
  useContext, useEffect, useRef,
} from 'react';
import { gsap } from 'gsap';

import { useLocation } from 'react-router-dom';

import './Home.scss';
import Button from '../../components/ui/Button';
import { StoreContext } from '../../context/StoreProvider';
import Strokes from '../../components/Strokes';
import HomeBackground from './components/HomeBackground';
import ScrollTo from '../../components/ui/ScrollTo';

const Home = () => {
  const ref = useRef<any>();
  const { dispatch } = useContext(StoreContext);
  const location = useLocation();

  const openContactModal = () => dispatch({ type: 'SET_CONTACT_MODAL_OPEN', payload: true });
  const loading = () => {
    dispatch({ type: 'SET_IS_LOADING', payload: true });
    setTimeout(() => dispatch({ type: 'SET_IS_LOADING', payload: false }), 1500);
  };

  useEffect(() => {
    const element = ref.current;
    const revealMask = element.querySelectorAll('.reveal-mask');
    const revealText = element.querySelectorAll('.reveal-text');

    for (let i = 0; i < revealMask.length; i++) {
      const tl = gsap.timeline();
      tl.to(
        revealMask[i],
        {
          scaleX: 1,
          duration: 0.8 + i * 0.25,
        },
      );
      tl.add('reveal');
      tl.to(
        revealMask[i],
        {
          scaleX: 0,
          transformOrigin: '100% 50%',
          duration: 0.5,
        },
        'reveal',
      );
      tl.to(
        revealText[i],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        'reveal',
      );
    }
  }, []);

  return (
    <>
      <section className="home-sec" ref={ref}>
        <Strokes secondary />
        <HomeBackground />
        <div className="welcome">
          <h1 aria-label="Hi, my name is Jean.">
            <div className="reveal">
              <span className="reveal-text">
                Hi,
              </span>
              <div className="reveal-mask" aria-hidden />
            </div>
            <br />
            <div className="reveal">
              <span className="reveal-text">
                my name is Jean.
              </span>
              <div className="reveal-mask" aria-hidden />
            </div>
          </h1>
          <div className="reveal description">
            <span className="reveal-text">
              I am a front-end developer based in Seoul.
            </span>
            <div className="reveal-mask" aria-hidden />
          </div>
          <div className="welcome-buttons">
            <Button onClick={openContactModal}>About me</Button>
          </div>
        </div>
        <ScrollTo to={{
          pathname: '/',
          hash: '#work',
          state: { from: location.pathname },
        }}
        >
          <div className="reveal">
            <span className="reveal-text">
              Selected works
            </span>
            <div className="reveal-mask" aria-hidden />
          </div>
        </ScrollTo>
      </section>
    </>
  );
};

export default Home;
