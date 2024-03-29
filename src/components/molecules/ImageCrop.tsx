import './ImageCrop.scss';

import cx from 'classnames';
import { gsap } from 'gsap';
import { memo, ReactNode, useEffect, useMemo, useRef } from 'react';

import useSize from 'hooks/useSize';
import { ImgSingleProp } from 'interface';

interface Props {
  preview: ImgSingleProp;
  children?: ReactNode;
  lazyload?: boolean;
  canPlay?: boolean;
}

const ImageCrop: React.FC<Props> = ({
  preview,
  children = null,
  lazyload = false,
  canPlay = false,
}: Props) => {
  const { isParallax, type, isVideo, urls } = preview;
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [width] = useSize(ref);

  useEffect(() => {
    if (isParallax) {
      gsap.to(ref.current!.querySelector('img'), {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          scrub: true,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (canPlay && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {}).catch((error) => {});
      }
    }
  }, [canPlay]);

  const src = useMemo(() => {
    if (!urls || (!width && isVideo)) {
      return '';
    }

    if (isVideo) {
      const minSize = window.devicePixelRatio * width;
      const keys = Object.keys(urls);
      let key = keys[keys.length - 1];
      for (let i = keys.length - 2; i >= 0; i--) {
        if (+keys[i] < minSize) {
          break;
        } else {
          key = keys[i];
        }
      }
      return urls[key];
    }

    const keys = Object.keys(urls);
    return urls[keys[keys.length - 1]];
  }, [urls, isVideo, width]);

  const srcSet = useMemo(() => {
    if (!urls || isVideo) {
      return '';
    }
    return Object.entries(urls)
      .map(([key, value]) => `${value} ${key}w`)
      .join();
  }, [urls, isVideo]);

  return (
    <div
      ref={ref}
      className={cx(
        'image-crop',
        { 'is-mobile': type === 'mobile' },
        { 'is-parallax': isParallax },
      )}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          loop
          muted
          width={preview?.width}
          height={preview?.height}
          src={src}
        ></video>
      ) : lazyload ? (
        <img
          data-src={src}
          data-srcset={srcSet}
          alt=""
          width={preview?.width}
          height={preview?.height}
          className="lazyload"
        />
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          alt=""
          width={preview?.width}
          height={preview?.height}
        />
      )}
      {children}
    </div>
  );
};

const areEquals = (prevProps: Props, nextProps: Props) =>
  prevProps.preview.url === nextProps.preview.url &&
  prevProps.lazyload === nextProps.lazyload &&
  prevProps.canPlay === nextProps.canPlay;

export default memo(ImageCrop, areEquals);
