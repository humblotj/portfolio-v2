import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import './HomeBackground.scss';

const HomeBackground: React.FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current!;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
      },
      defaults: {
        ease: 'power3.inOut',
      },
    });
    tl.to(element.querySelector('.overlay'), {
      scaleX: 1,
      duration: 0.4 + 0.2 * 3,
    });
    tl.to(
      element.querySelector('.overlay'),
      {
        scaleX: 0,
        transformOrigin: '0 50%',
        duration: 0.2,
      },
      '+=0.3',
    );
    tl.to(
      element.querySelector('.abstract-background'),
      {
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
      },
      '<0.15',
    );
  }, []);

  return (
    <div ref={ref} className="home-background">
      <div className="abstract-background" data-testid="abstract-background" />
      <div className="overlay" />
    </div>
  );
};

export default HomeBackground;
