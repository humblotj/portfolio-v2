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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={cx('image-crop', { 'is-mobile': isMobile })}>
      {src.includes('mp4')
        ? (
          <video autoPlay loop muted width="638.65" height="400.9">
            <source src={src} />
          </video>
        )
        : <img src={src || ''} alt="" />}
      {children}
    </div>
  );
};

export default ImageCrop;
