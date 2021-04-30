import { useEffect, useRef } from 'react';
import cx from 'classnames';
import { gsap } from 'gsap';

import './ImageWrap.scss';
import image from '../../assets/test.jpeg';
import image2 from '../../assets/test1.jpeg';
import useSize from '../../hooks/useSize';
import SuspenseImg from '../SuspenseImg';

interface Props {
  isMobile?: boolean
  isParallax?: boolean
}

const ImageWrap = ({ isMobile = false, isParallax = false }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width] = useSize(ref);

  useEffect(() => {
    if (isParallax) {
      setTimeout(() => {
        if (ref.current) {
          gsap.to(ref.current.querySelector('img'), {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              scrub: true,
            },
          });
        }
      }, 100);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={cx('image-wrap', { 'is-mobile': isMobile })}
      style={{ height: width * (isMobile ? 1.6417 : 0.5925) }}
    >
      <div className="image-crop">
        <SuspenseImg src={(isMobile || isParallax) ? image2 : image} />
      </div>
    </div>
  );
};

export default ImageWrap;
