import { useEffect, useRef, useState } from 'react';
import { gsap, Power2 } from 'gsap';
import cx from 'classnames';

import ImageWrap from '../../../components/ui/ImageWrap';
import { ImgProp } from '../../../interface';
import './WorkDetailParallax.scss';
import useSize from '../../../hooks/useSize';

const WorkDetailParallax = ({ preview }: {preview: ImgProp}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(ref);
  const isMobile = preview.type === 'mobile';
  const [animationIsComplete, setAnimationIsComplete] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !preview) {
      return;
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
  }, [preview]);

  if (!preview) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cx('preview-container', { 'is-mobile': isMobile })}
      // style={!isMobile ? { height: `${height}px` } : undefined}
    >
      <ImageWrap
        src={preview.url}
        isMobile={isMobile}
        startAnimation={animationIsComplete}
        isParallax={!preview.noParallax}
      />
    </div>
  );
};

export default WorkDetailParallax;
