import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import './WhatIDoIntro.scss';
import mockup from '../../../../assets/mobilewebapp.png';

const WhatIDoIntro = () => {
  const ref = useRef<HTMLLIElement>(null);

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
      <img src={mockup} alt="" />
    </li>
  );
};

export default WhatIDoIntro;
