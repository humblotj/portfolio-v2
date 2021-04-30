import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import ImageWrap from '../../../components/ui/ImageWrap';
import './WorkDetailParallax.scss';

const WorkDetailParallax = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
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
  }, []);
  return (
    <div ref={ref} className="preview-container">
      <div className="reveal">
        <ImageWrap isParallax />
        <div className="reveal-mask" />
      </div>
    </div>
  );
};

export default WorkDetailParallax;
