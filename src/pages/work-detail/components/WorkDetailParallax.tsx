import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import cx from 'classnames';

import './WorkDetailParallax.scss';
import { ImgSingleProp } from '../../../interface';
import ImageWrap from '../../../components/molecules/ImageWrap';

const useAnimateOnInit = (ref: React.RefObject<HTMLDivElement>) => {
  const [animationIsComplete, setAnimationIsComplete] = useState(false);

  useEffect(() => {
    const element = ref.current!;

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

    return () => {
      tl.kill();
    };
  }, []);

  return animationIsComplete;
};

const WorkDetailParallax = ({ preview }: { preview: ImgSingleProp }) => {
  const ref = useRef<HTMLDivElement>(null);
  const animationIsComplete = useAnimateOnInit(ref);
  const isMobile = preview.type === 'mobile';

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
