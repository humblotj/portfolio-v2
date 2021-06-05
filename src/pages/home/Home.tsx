import { RefObject, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useDispatch } from 'react-redux';
import Scrollbar from 'smooth-scrollbar';

import './Home.scss';
import Button from '../../components/ui/Button';
import Strokes from '../../components/Strokes';
import HomeBackground from './components/HomeBackground';
import ScrollTo from '../../components/ui/ScrollTo';
import TextBounce from '../../components/ui/TextBounce';
import { onToggleAboutModal } from '../../store/store';
import useScrollbar from '../../hooks/useScrollbar';

const Home = ({ workRef }: {workRef: RefObject<HTMLElement>}) => {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();
  const openContactModal = () => dispatch(onToggleAboutModal(true));
  const bodyScrollbar = Scrollbar.get(document.body);
  const { onListenerTrigger } = useScrollbar();

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

    onListenerTrigger();

    const tl = gsap.timeline();

    const blink = document.querySelectorAll('.blink');
    tl.fromTo(blink,
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
    tl.to(blink,
      {
        autoAlpha: 0.1,
        duration: 0.1,
        pointerEvents: 'none',
      });
    tl.to(blink,
      {
        autoAlpha: 0.8,
        duration: 0.1,
        pointerEvents: 'none',
      });
    tl.to(blink,
      {
        autoAlpha: 0.2,
        duration: 0.2,
        pointerEvents: 'none',
      });
    tl.to(blink,
      {
        autoAlpha: 1,
        duration: 0.4,
        pointerEvents: 'auto',
      });
  }, []);

  const scrollToWork = () => {
    if (bodyScrollbar) {
      bodyScrollbar.scrollTo(0, workRef.current?.offsetTop, 1000);
    } else {
      workRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <div className="welcome-buttons blink">
            <Button onClick={openContactModal}>About me</Button>
          </div>
        </div>
        <ScrollTo onClick={scrollToWork}>
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
