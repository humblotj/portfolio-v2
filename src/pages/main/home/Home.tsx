import { RefObject, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import './Home.scss';
import Button from '../../../components/atoms/Button';
import Strokes from '../../../components/molecules/Strokes';
import HomeBackground from './components/HomeBackground';
import ScrollTo from '../../../components/molecules/ScrollTo';
import TextBounce from '../../../components/molecules/TextBounce';
import { onToggleAboutModal } from '../../../store/store';
import useAnimation from '../../../hooks/useAnimation';

interface Props {
  workRef: RefObject<HTMLElement>;
}

const Home: React.FC<Props> = ({ workRef }) => {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();
  const openContactModal = () => dispatch(onToggleAboutModal(true));
  const { animateReveal, animateBlink } = useAnimation();

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const reveal = element.querySelectorAll('.reveal');
    for (let i = 0; i < reveal.length; i++) {
      const tl = animateReveal(reveal[i], { delay: i * 0.12 });

      if (i === reveal.length - 1) {
        tl.to(
          element.querySelector('.scroll-stroke'),
          {
            scale: 1,
            duration: 1,
            ease: 'power4.out',
          },
          '<',
        );
      }
    }

    animateBlink(element);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToWork = () => {
    workRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
          <div className="reveal-mask" aria-hidden />
        </div>
      </div>
      <ScrollTo onClick={scrollToWork}>
        <div className="reveal">
          <span className="reveal-text">Selected works</span>
          <div className="reveal-mask" aria-hidden />
        </div>
      </ScrollTo>
    </section>
  );
};

export default Home;
