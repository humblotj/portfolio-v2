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
import TextBounce from '../../components/ui/TextBounce';

const Home = () => {
  const ref = useRef<HTMLElement>(null);
  const { store: { isInit }, dispatch } = useContext(StoreContext);
  const location = useLocation();

  const openContactModal = () => dispatch({ type: 'SET_CONTACT_MODAL_OPEN', payload: true });
  const loading = () => {
    dispatch({ type: 'SET_IS_LOADING', payload: true });
    setTimeout(() => dispatch({ type: 'SET_IS_LOADING', payload: false }), 1500);
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const reveal = element.querySelectorAll('.reveal');

    for (let i = 0; i < reveal.length; i++) {
      const tl = gsap.timeline();
      tl.to(
        reveal[i].querySelector('.reveal-mask'),
        {
          scaleX: 1,
          duration: 0.8 + i * 0.25,
          delay: isInit ? 0 : 0.3,
        },
      );
      tl.add('reveal');
      tl.to(
        reveal[i].querySelector('.reveal-mask'),
        {
          scaleX: 0,
          transformOrigin: '100% 50%',
          duration: 0.5,
          delay: 0.2,
        },
        'reveal',
      );
      tl.to(
        reveal[i].querySelector('.reveal-text'),
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.2,
        },
        'reveal',
      );
    }

    const tl = gsap.timeline();
    tl.fromTo(element.querySelector('.welcome-buttons'),
      {
        autoAlpha: 0,
        pointerEvents: 'none',
      },
      {
        autoAlpha: 0.8,
        duration: 0.1,
        delay: 0.8 + 0.7 + 0.25 * 3,
        pointerEvents: 'none',
      });
    tl.to(element.querySelector('.welcome-buttons'),
      {
        autoAlpha: 0.1,
        duration: 0.1,
        pointerEvents: 'none',
      });
    tl.to(element.querySelector('.welcome-buttons'),
      {
        autoAlpha: 0.8,
        duration: 0.1,
        pointerEvents: 'none',
      });
    tl.to(element.querySelector('.welcome-buttons'),
      {
        autoAlpha: 0.2,
        duration: 0.2,
        pointerEvents: 'none',
      });
    tl.to(element.querySelector('.welcome-buttons'),
      {
        autoAlpha: 1,
        duration: 0.4,
        pointerEvents: 'auto',
      });
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
                <TextBounce text="Hi," />
              </span>
              <div className="reveal-mask" aria-hidden />
            </div>
            <br />
            <div className="reveal">
              <span className="reveal-text">
                <TextBounce text="my name is Jean." />
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
          state: 'work',
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
