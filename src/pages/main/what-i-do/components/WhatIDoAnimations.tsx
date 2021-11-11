import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import './WhatIDoAnimations.scss';
import Laptop from '../../../../components/molecules/Laptop';

const WhatIDoAnimations = () => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const element = ref.current!;

    gsap.fromTo(
      element.querySelector('.part.top'),
      {
        rotationX: -90,
        duration: 0.9,
      },
      {
        rotationX: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: element,
          start: '40% bottom',
          toggleActions: 'play none none reset',
        },
        delay: 0.5,
      },
    );
  }, []);

  return (
    <li ref={ref} className="what-i-do-animations">
      <h3 className="heading">
        With
        <br />
        Awesome Animations
      </h3>
      <Laptop
        preview={{
          type: 'web',
          isVideo: true,
          url: 'https://firebasestorage.googleapis.com/v0/b/jeanhumblot-901ae.appspot.com/o/airpodspro_544.mp4?alt=media&token=184be5a1-0b9c-4a3f-b8dc-794387917fad',
          urls: {
            800: 'https://firebasestorage.googleapis.com/v0/b/jeanhumblot-901ae.appspot.com/o/airpodspro_544.mp4?alt=media&token=184be5a1-0b9c-4a3f-b8dc-794387917fad',
          },
          width: 800,
          height: 450,
        }}
        noAnimation
        lazyload
      />
    </li>
  );
};

export default WhatIDoAnimations;
