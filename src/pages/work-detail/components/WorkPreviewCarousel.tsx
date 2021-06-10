import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { gsap } from 'gsap';

import './WorkPreviewCarousel.scss';
import { useEffect, useRef } from 'react';
import BackArrow from '../../../components/ui/BackArrow';
import { ImgProp, WorkDetailProps } from '../../../interface';

interface Props {
  work: WorkDetailProps,
}

const PreviewItem = (pictures: ImgProp[]) => pictures?.map((item, i) => (
  <div className="wrap" data-value={i + 1} key={item.url}>
    <img className={item.type} src={item.url} alt="" draggable={false} />
  </div>
));

const WorkPreviewCarousel = ({ work }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = overlayRef.current;
    if (!element || !work) {
      return;
    }

    setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
        },
      });
      tl.to(
        element,
        {
          width: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        },
      );
    }, 100);
  }, [work]);

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
      <div className="work-preview-overlay" ref={overlayRef} />
    </div>

  );
};

export default WorkPreviewCarousel;
