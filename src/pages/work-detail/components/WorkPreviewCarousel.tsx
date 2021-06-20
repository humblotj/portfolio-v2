import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { gsap } from 'gsap';

import './WorkPreviewCarousel.scss';
import { useEffect, useRef } from 'react';
import BackArrow from '../../../components/ui/BackArrow';
import { ImgProp, WorkDetailProps } from '../../../interface';
import Strokes from '../../../components/Strokes';
import useSize from '../../../hooks/useSize';

interface Props {
  work: WorkDetailProps,
  canStartCarAnimation: boolean
}

const PreviewItem = (pictures: ImgProp[]) => pictures?.map((item, i) => (
  <div className="wrap" data-value={i + 1} key={item.url}>
    <img width={item.type === 'web' ? 760 : 300} className={item.type} src={item.url} alt="" draggable={false} />
  </div>
));

const WorkPreviewCarousel = ({ work, canStartCarAnimation }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(overlayRef);

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
    tl.to(
      element,
      {
        width: 0,
        duration: 1,
        ease: 'power2.inOut',
      },
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canStartCarAnimation]);

  if (!work) {
    return null;
  }

  const { pictures, previousWork, nextWork } = work;

  return (
    <div className="work-preview-carousel">
      <div className="work-preview-carousel-inner">
        <Slider
          slidesToShow={1}
          infinite={false}
        >
          {PreviewItem(pictures)}
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
