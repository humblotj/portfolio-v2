/* eslint-disable no-nested-ternary */
import {
  ReactNode, useEffect, useMemo, useRef, memo,
} from 'react';
import { gsap } from 'gsap';
import cx from 'classnames';

import './ImageCrop.scss';
import { ImgSingleProp } from '../../interface';
import useSize from '../../hooks/useSize';

interface Props {
  preview: ImgSingleProp;
  children?: ReactNode;
  lazyload?: boolean;
  animationDone?: boolean;
}

const ImageCrop = ({
  preview, children = null, lazyload = false, animationDone = false,
}: Props) => {
  const {
    isParallax, type, isVideo, urls,
  } = preview;
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [width] = useSize(ref);

  useEffect(() => {
    if (isParallax) {
      if (ref.current) {
        gsap.to(ref.current.querySelector('img'), {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            scrub: true,
          },
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (animationDone && videoRef.current) {
      videoRef.current.play();
    }
  }, [animationDone]);

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
    return Object.entries(urls).map(([key, value]) => (`${value} ${key}w`)).join();
  }, [urls, isVideo]);

  return (
    <div ref={ref} className={cx('image-crop', { 'is-mobile': type === 'mobile' })}>
      {isVideo
        ? (
          <video
            ref={videoRef}
            loop
            muted
            width={preview?.width}
            height={preview?.height}
            key={src}
          >
            <source src={src} type="video/mp4" />
          </video>
        )
        : lazyload ? (
          <img
            data-src={src}
            data-srcset={srcSet}
            alt=""
            width={preview?.width}
            height={preview?.height}
            className="lazyload"
          />
        )
          : (
            <img
              src={src}
              srcSet={srcSet}
              key={src}
              alt=""
              width={preview?.width}
              height={preview?.height}
            />
          )}
      {children}
    </div>
  );
};

export default memo(ImageCrop);
