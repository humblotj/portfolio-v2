import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';

import './Laptop.scss';
import MacbookCover from '../../assets/macbook-cover.svg';
import MacbookTop from '../../assets/macbook-top.svg';
import MacbookBottom from '../../assets/macbook-bottom.svg';
import ImageCrop from './ImageCrop';
import useSize from '../../hooks/useSize';
import { ImgSingleProp } from '../../interface';

interface Props {
  preview: ImgSingleProp;
  startAnimation?: boolean;
  noAnimation?: boolean;
  lazyload?: boolean;
}

const Laptop: React.FC<Props> = ({
  preview,
  startAnimation = false,
  noAnimation = false,
  lazyload = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width] = useSize(ref);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (noAnimation) {
      gsap.set(element.querySelector('.part.top'), { rotationX: 0 });
    } else if (startAnimation) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'bottom bottom',
        },
      });

      tl.to(element.querySelector('.part.top'), {
        rotationX: 0,
        duration: 0.9,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation]);

  return (
    <div ref={ref} className="mockup" style={{ perspective: width * 5 }}>
      <div className="part top">
        <img
          style={{
            transform: `translate3d(0, 0, -${width / 65}px) rotateX(90deg)`,
          }}
          src={MacbookTop}
          alt="top"
          className="top"
          width="694"
          height="12"
        />
        <img
          src={MacbookCover}
          alt="cover"
          className="cover"
          width="694"
          height="466"
        />
        <ImageCrop preview={preview} lazyload={lazyload} />
      </div>
      <div className="part bottom">
        <img
          src={MacbookCover}
          alt="cover"
          className="cover"
          width="694"
          height="466"
        />
        <img
          src={MacbookBottom}
          alt="bottom"
          className="bottom"
          width="694"
          height="18"
        />
      </div>
    </div>
  );
};

const areEquals = (prevProps: Props, nextProps: Props) =>
  prevProps.preview.url === nextProps.preview.url &&
  prevProps.startAnimation === nextProps.startAnimation &&
  prevProps.noAnimation === nextProps.noAnimation &&
  prevProps.lazyload === nextProps.lazyload;

export default memo(Laptop, areEquals);