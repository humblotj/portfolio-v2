import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import './HomeBackground.scss';

const HomeBackground = () => {
  const ref = useRef<any>();

  useEffect(() => {
    const element = ref.current;
    const tl = gsap.timeline();
    tl.to(element.querySelector('.overlay'),
      {
        scaleX: 1,
        duration: 0.8,
      });
    tl.to(element.querySelector('.overlay'),
      {
        scaleX: 0,
        transformOrigin: '0 50%',
        duration: 0.5 + 0.25 * 3,
      });
    gsap.to(element.querySelector('.abstract-background'),
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.8,
      });
  }, []);

  return (
    <div ref={ref} className="home-background">
      <div className="abstract-background" />
      <div className="overlay" />
    </div>
  );
};

export default HomeBackground;
