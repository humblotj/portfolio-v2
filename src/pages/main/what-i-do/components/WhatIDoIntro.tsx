import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import './WhatIDoIntro.scss';
import mockup300 from '../../../../assets/mobilewebapp-300.png';
import mockup550 from '../../../../assets/mobilewebapp-550.png';
import mockup800 from '../../../../assets/mobilewebapp-800.png';
import mockup1200 from '../../../../assets/mobilewebapp-1200.png';
import mockup1600 from '../../../../assets/mobilewebapp-1600.png';

const useAnimateOnInit = (ref: React.RefObject<HTMLLIElement>) => {
  useEffect(() => {
    const element = ref.current!;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: '50% bottom',
      },
    });

    tl.to(
      element.querySelectorAll('h3, p'),
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.2,
        ease: 'power3.out',
      },
      '>0.3',
    );
    tl.to(element.querySelector('img'), {
      opacity: 1,
      x: 0,
      duration: 0.3,
    });
  }, []);
};

const WhatIDoIntro = () => {
  const ref = useRef<HTMLLIElement>(null);
  useAnimateOnInit(ref);

  return (
    <li ref={ref} className="what-i-do-intro">
      <div>
        <h3 className="heading">
          I developped
          <br />
          mobile and web applications
        </h3>
        <p>
          From front-end to release, including back-end for middle-size project
        </p>
      </div>
      <img
        data-src={mockup1600}
        data-srcset={`${mockup300} 300w, ${mockup550} 550w, ${mockup800} 800w, ${mockup1200} 1200w, ${mockup1600} 1600w,`}
        alt="mobile-app"
        className="lazyload"
        height={1143}
        width={1600}
      />
    </li>
  );
};

export default WhatIDoIntro;
