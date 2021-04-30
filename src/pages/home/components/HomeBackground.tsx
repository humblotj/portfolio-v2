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

    const tl = gsap.timeline();
    tl.fromTo(element.querySelector('.overlay'),
      { scaleX: 0 },
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

    setTimeout(() => gsap.to('.abstract-background', {
      backgroundPosition: `90% ${window.innerHeight / 2}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    }), 100);
  }, []);

  return (
    <div ref={ref} className="home-background">
      <div className="abstract-background" />
      <div className="overlay" />
    </div>
  );
};

export default HomeBackground;
