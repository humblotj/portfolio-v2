import { useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './WorkPreviewCarousel.scss';
import BackArrow from '../../../components/atoms/BackArrow';
import { ImgProp, WorkDetailProps } from '../../../interface';
import Strokes from '../../../components/molecules/Strokes';
import Phone from '../../../components/molecules/Phone';
import useSize from '../../../hooks/useSize';

interface Props {
  work: WorkDetailProps;
}

const PreviewItem = ({ previews, name }: { previews: ImgProp; name: string }) =>
  previews.urls?.map((item, i) => {
    const srcSet = Object.entries(item)
      .map(([key, value]) => `${value} ${key}w`)
      .join();
    const keys = Object.keys(item);
    const src = item[keys[keys.length - 1]];
    const isMobile = previews.type === 'mobile';

    return (
      <div className="wrap" data-value={i + 1} key={src}>
        {isMobile ? (
          <div className="phone-wrap">
            <Phone preview={{ ...previews, urls: item }} noAnimation />
          </div>
        ) : (
          <img
            width={previews.width}
            height={previews.height}
            className={previews.type}
            src={src}
            srcSet={srcSet}
            alt={`${name}_${i}`}
            draggable={false}
          />
        )}
      </div>
    );
  });

const WorkPreviewCarousel = ({ work }: Props) => {
  const [width] = useSize();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(ref.current!.querySelector('.carousel-wrap'), {
      opacity: 1,
      duration: 0.3,
      ease: 'power.out3',
      scrollTrigger: { trigger: ref.current, start: '30% bottom' },
    });
  }, []);

  const slidesToShow = useMemo(() => {
    if (work?.previews?.type === 'web') {
      return 1;
    }
    return width > 768 ? 3 : 2;
  }, [work?.previews?.type, width]);

  if (!work) {
    return null;
  }

  const { previews, name } = work;

  return (
    <div ref={ref} className="work-preview-carousel">
      <div className="work-preview-carousel-inner">
        <div className="carousel-wrap">
          <Slider slidesToShow={slidesToShow} infinite={false}>
            {PreviewItem({ previews, name })}
          </Slider>
        </div>
      </div>
      <Strokes />
    </div>
  );
};

export default WorkPreviewCarousel;
