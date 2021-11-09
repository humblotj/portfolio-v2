import { useEffect, useRef, memo, useState } from 'react';
import { gsap } from 'gsap';

import './Phone.scss';
import { ImgSingleProp } from '../../interface';
import ImageCrop from './ImageCrop';
import PhoneMockup from '../../assets/phone-mockup.png';

interface Props {
  preview: ImgSingleProp;
  startAnimation?: boolean;
  noAnimation?: boolean;
  lazyload?: boolean;
}

const Phone: React.FC<Props> = ({
  preview,
  startAnimation = false,
  noAnimation = false,
  lazyload = false,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const element = ref.current!;

    if (noAnimation) {
      gsap.set(element.querySelector('.phone-overlay'), { opacity: 0 });
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

      tl.to(element.querySelector('.phone-overlay'), {
        opacity: 0,
        duration: 0.9,
      });

      if (preview.isVideo) {
        tl.call(() => setCanPlay(true));
      }

      return () => {
        tl.kill();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation]);

  return (
    <div ref={ref} className="phone">
      <img
        src={PhoneMockup}
        alt="mockup"
        className="phone-mockup"
        width="365"
        height="731"
      />
      <ImageCrop preview={preview} lazyload={lazyload} canPlay={canPlay}>
        <div className="phone-overlay" data-testid="overlay" />
      </ImageCrop>
    </div>
  );
};

const areEquals = (prevProps: Props, nextProps: Props) =>
  prevProps.preview.url === nextProps.preview.url &&
  prevProps.startAnimation === nextProps.startAnimation &&
  prevProps.noAnimation === nextProps.noAnimation &&
  prevProps.lazyload === nextProps.lazyload;

export default memo(Phone, areEquals);
