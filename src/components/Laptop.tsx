import { useEffect, useRef } from 'react';
import gsap from 'gsap/all';

import './Laptop.scss';
import MacbookCover from '../assets/macbook-cover.svg';
import MacbookTop from '../assets/macbook-top.svg';
import MacbookBottom from '../assets/macbook-bottom.svg';

interface Props {
  src: string
}

const Laptop = ({ src }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    gsap.to(element,
      {
        opacity: 1,
        x: 0,
        duration: 1,
        onComplete: () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'bottom bottom',
            },
          });

          tl.to(element.querySelector('.part.top'),
            {
              rotationX: 0,
              duration: 0.9,
            });
        },
      });
  }, []);

  return (
    <div ref={ref} className="mockup mockup-macbook opened">
      <div className="part top">
        <img src={MacbookTop} alt="" className="top" />
        <img src={MacbookCover} alt="" className="cover" />
        <div className="image-crop">
          <img src={src} alt="" />
        </div>
      </div>
      <div className="part bottom">
        <img src={MacbookCover} alt="" className="cover" />
        <img src={MacbookBottom} alt="" className="bottom" />
      </div>
    </div>
  );
};

export default Laptop;
