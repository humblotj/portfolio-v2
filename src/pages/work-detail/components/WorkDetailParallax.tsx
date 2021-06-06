import { useEffect, useRef, useState } from 'react';
import { gsap, Power2 } from 'gsap';
import cx from 'classnames';

import ImageWrap from '../../../components/ui/ImageWrap';
import { ImgProp } from '../../../interface';
import './WorkDetailParallax.scss';
import useSize from '../../../hooks/useSize';

const WorkDetailParallax = ({ preview }: {preview: ImgProp}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = preview.type === 'mobile';
  const [animationIsComplete, setAnimationIsComplete] = useState(false);
  const [width] = useSize();

  const getInitialHeight = () => {
    const coeff = 0.6715;

    if (width > 1014) {
      return 694 * coeff + 40;
    }
    if (width > 768) {
      return (width - 160 - 160) * coeff + 40;
    }
    if (width > 576) {
      return (width - 120 - 160) * coeff + 40;
    }
    return (width - 80 - 40) * coeff + 20;
  };

  useEffect((): any => {
    const element = ref.current;
    if (!element || !preview) {
      return null;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
      },
    });
    tl.addLabel('start');
    tl.to(
      element,
      {
        x: 0,
        duration: 1.3,
        onComplete: () => setAnimationIsComplete(true),
      }, 'start',
    );
    tl.to(
      element,
      {
        opacity: 1,
        ease: Power2.easeIn,
        duration: 1.3,
      }, 'start',
    );

    return () => tl.kill();
  }, [preview]);

  if (!preview) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cx('preview-container', { 'is-mobile': isMobile })}
      style={!isMobile ? { height: `${getInitialHeight()}px` } : undefined}
    >
      <ImageWrap
        src={preview.url}
        isMobile={isMobile}
        startAnimation={animationIsComplete}
        isParallax={preview.isParallax}
      />
    </div>
  );
};

export default WorkDetailParallax;
