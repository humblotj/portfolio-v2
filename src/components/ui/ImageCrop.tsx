/* eslint-disable jsx-a11y/media-has-caption */
import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import cx from 'classnames';

import './ImageCrop.scss';

interface Props {
  src: string;
  isMobile?: boolean;
  isParallax?: boolean;
  children?: ReactNode;
}

const ImageCrop = ({
  src, isMobile = false, isParallax = false, children = null,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isParallax) {
      if (ref.current) {
        gsap.to(ref.current.querySelector('img'), {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            scrub: true,
          },
        });
      }
    }
  }, []);

  return (
    <div ref={ref} className={cx('image-crop', { 'is-mobile': isMobile })}>
      <div>
        {src.includes('mp4')
          ? (
            <video autoPlay loop muted>
              <source src={src} />
            </video>
          )
          : <img src={src || ''} alt="" />}
      </div>
      {children}
    </div>
  );
};

export default ImageCrop;
