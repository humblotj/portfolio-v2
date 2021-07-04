import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import './WorkPreviewCarousel.scss';
import { useEffect, useRef } from 'react';
import BackArrow from '../../../components/ui/BackArrow';
import { ImgProp, WorkDetailProps } from '../../../interface';
import Strokes from '../../../components/Strokes';
import useSize from '../../../hooks/useSize';
import useAnimation from '../../../hooks/useAnimation';

interface Props {
  work: WorkDetailProps,
  canStartCarAnimation: boolean
}

const PreviewItem = ({ previews, name }: {previews: ImgProp, name: string}) => (
  previews.urls?.map((item, i) => {
    const srcSet = Object.entries(item).map(([key, value]) => (`${value} ${key}w`)).join();
    const keys = Object.keys(item);
    const src = item[keys[keys.length - 1]];

    return (
      <div className="wrap" data-value={i + 1} key={src}>
        <img width={previews.width} height={previews.height} className={previews.type} src={src} srcSet={srcSet} alt={`${name}_${i}`} draggable={false} />
      </div>
    );
  })
);

const WorkPreviewCarousel = ({ work, canStartCarAnimation }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(overlayRef);
  const { gsap } = useAnimation();

  useEffect(() => {
    const element = overlayRef.current;
    if (!element || !work || !canStartCarAnimation) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: '20% bottom',
      },
    });
    tl.to(element, { width: 0, duration: 1, ease: 'power2.inOut' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canStartCarAnimation]);

  if (!work) {
    return null;
  }

  const {
    previews, previousWork, nextWork, name,
  } = work;

  return (
    <div className="work-preview-carousel">
      <div className="work-preview-carousel-inner">
        <Slider
          slidesToShow={1}
          infinite={false}
        >
          {PreviewItem({ previews, name })}
        </Slider>
      </div>
      <div className="project-controls">
        <BackArrow
          to={nextWork}
          disabled={!nextWork}
        >
          Previous Work
        </BackArrow>
        <BackArrow
          direction="right"
          to={previousWork}
          disabled={!previousWork}
        >
          Next Work
        </BackArrow>
      </div>
      <div className="work-preview-overlay" ref={overlayRef}>
        <Strokes style={{
          height: `${height}px`,
          position: canStartCarAnimation ? 'fixed' : 'static',
        }}
        />
      </div>
      <Strokes />
    </div>

  );
};

export default WorkPreviewCarousel;
