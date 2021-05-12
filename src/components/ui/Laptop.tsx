import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import './Laptop.scss';
import MacbookCover from '../../assets/macbook-cover.svg';
import MacbookTop from '../../assets/macbook-top.svg';
import MacbookBottom from '../../assets/macbook-bottom.svg';
import ImageCrop from './ImageCrop';
import useSize from '../../hooks/useSize';

interface Props {
  src: string;
  startAnimation: boolean;
  noAnimation?: boolean;
  isParallax?: boolean;
}

const Laptop = ({
  src, startAnimation, noAnimation = false, isParallax = false,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width] = useSize(ref);

  useEffect(() => {
    const element = ref.current;
    if (!element || !startAnimation) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'bottom bottom',
      },
    });

    tl.to(element.querySelector('.part.top'),
      {
        rotationX: 0,
        duration: noAnimation ? 0 : 0.9,
      });
  }, [startAnimation]);

  return (
    <div
      ref={ref}
      className="mockup"
      style={{ perspective: width * 5 }}
    >
      <div className="part top">
        <img
          style={{ transform: `translate3d(0, 0, -${width / 65}px) rotateX(90deg)` }}
          src={MacbookTop}
          alt=""
          className="top"
        />
        <img src={MacbookCover} alt="" className="cover" />
        <ImageCrop src={src} isParallax={isParallax} />
      </div>
      <div className="part bottom">
        <img src={MacbookCover} alt="" className="cover" />
        <img src={MacbookBottom} alt="" className="bottom" />
      </div>
    </div>
  );
};

export default Laptop;