import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import cx from 'classnames';

import ImageWrap from '../../../components/ui/ImageWrap';
import { ImgProp } from '../../../interface';
import './WorkDetailParallax.scss';

const WorkDetailParallax = ({ preview }: {preview: ImgProp}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !preview) {
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      element.querySelector('.reveal-mask'),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.3,
      },
    );
    tl.add('reveal');
    tl.to(
      element.querySelector('.reveal-mask'),
      {
        scaleX: 0,
        transformOrigin: '100% 50%',
        duration: 0.5,
        delay: 0.2,
      },
      'reveal',
    );
    tl.to(
      element.querySelector('.image-wrap'),
      {
        opacity: 1,
        duration: 0.5,
        delay: 0.2,
      },
      'reveal',
    );
  }, [preview]);

  if (!preview) {
    return null;
  }

  return (
    <div ref={ref} className={cx('preview-container', { 'is-mobile': preview.type === 'mobile' })}>
      <div className="reveal">
        <ImageWrap isParallax={!preview.noParallax} src={preview.url} isMobile={preview.type === 'mobile'} />
        <div className="reveal-mask" />
      </div>
    </div>
  );
};

export default WorkDetailParallax;
