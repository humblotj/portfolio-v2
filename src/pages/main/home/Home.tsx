import { RefObject, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import './Home.scss';
import Button from '../../../components/atoms/Button';
import Strokes from '../../../components/molecules/Strokes';
import HomeBackground from './components/HomeBackground';
import ScrollTo from '../../../components/molecules/ScrollTo';
import TextBounce from '../../../components/molecules/TextBounce';
import Sns from '../../../components/organisms/Sns';
import { onToggleAboutModal } from '../../../store/store';
import useAnimation from '../../../hooks/useAnimation';

const useAnimateOnInit = (ref: React.RefObject<HTMLElement>) => {
  const { revealText, animateBlink } = useAnimation();

  useEffect(() => {
    const element = ref.current!;
    const reveal = element.querySelectorAll('.reveal');

    for (let i = 0; i < reveal.length; i++) {
      const tl = revealText(reveal[i], { delay: i * 0.2 });

      if (i === reveal.length - 1) {
        tl.to(
          element.querySelector('.scroll-stroke'),
          {
            scale: 1,
            duration: 0.9,
            ease: 'power4.out',
          },
          '<',
        );
        tl.call(() => animateBlink(element), undefined, '<0.4');
      }
    }
  }, []);
};

interface Props {
  whatIDoRef: RefObject<HTMLElement>;
}

const Home: React.FC<Props> = ({ whatIDoRef }) => {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useDispatch();
  const openContactModal = () => dispatch(onToggleAboutModal(true));
  useAnimateOnInit(ref);

  const scrollDown = () => {
    whatIDoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="home-sec" ref={ref}>
      <Sns blink />
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
      <ScrollTo onClick={scrollDown}>
        <div className="reveal">
          <span className="reveal-text">Scroll down</span>
          <div className="reveal-mask" aria-hidden />
        </div>
      </ScrollTo>
    </section>
  );
};

export default Home;
