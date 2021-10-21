import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import cx from 'classnames';

import './WorkDetailParallax.scss';
import { ImgSingleProp } from '../../../interface';
import ImageWrap from '../../../components/molecules/ImageWrap';

const WorkDetailParallax = ({ preview }: { preview: ImgSingleProp }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = preview.type === 'mobile';
  const [animationIsComplete, setAnimationIsComplete] = useState(false);

  useEffect((): any => {
    const element = ref.current;
    if (!element) {
      return null;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
      },
      defaults: {
        duration: 0.6,
      },
    });
    tl.to(element, { x: 0 }, 0);
    tl.to(element, { opacity: 1, ease: 'power1.in' }, 0);
    tl.call(() => setAnimationIsComplete(true), undefined, '+=0.4');

    return () => tl.kill();
  }, [preview]);

  if (!preview) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cx('preview-container', { 'is-mobile': isMobile })}
      data-testid="parallax"
    >
      <ImageWrap preview={preview} startAnimation={animationIsComplete} />
    </div>
  );
};

export default WorkDetailParallax;
