import './Laptop.scss';

import { gsap } from 'gsap';
import { memo, useEffect, useRef, useState } from 'react';

import MacbookBottom from 'assets/macbook-bottom.svg';
import MacbookCover from 'assets/macbook-cover.svg';
import MacbookTop from 'assets/macbook-top.svg';
import useSize from 'hooks/useSize';
import { ImgSingleProp } from 'interface';
import ImageCrop from './ImageCrop';

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
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const element = ref.current!;

    if (noAnimation) {
      gsap.set(element.querySelector('.part.top'), {
        rotationX: 0,
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'bottom bottom',
        },
      });

      if (preview.isVideo) {
        tl.call(() => setCanPlay(true), undefined, 1);
      }
      return () => tl.kill();
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

      if (preview.isVideo) {
        tl.call(() => setCanPlay(true));
      }

      return () => {
        tl.kill();
      };
    }
  }, [startAnimation]);

  return (
    <div ref={ref} className="mockup" style={{ perspective: width * 5 }}>
      <div className="part top" data-testid="top">
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
        <ImageCrop preview={preview} lazyload={lazyload} canPlay={canPlay} />
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
