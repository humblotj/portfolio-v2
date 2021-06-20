import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import './HomeBackground.scss';

const HomeBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
      },
      defaults: {
        ease: 'power3.inOut',
      },
    });
    tl.to(element.querySelector('.overlay'),
      {
        scaleX: 1,
        duration: 0.4 + 0.12 * 4,
      });
    tl.to(element.querySelector('.overlay'),
      {
        scaleX: 0,
        transformOrigin: '0 50%',
        duration: 0.4,
      }, '+=0.4');
    tl.to(element.querySelector('.abstract-background'),
      {
        opacity: 1,
        duration: 1,
        ease: 'power1.out',
      }, '<0.15');

    gsap.to('.abstract-background', {
      backgroundPosition: `90% ${window.innerHeight / 2}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
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
