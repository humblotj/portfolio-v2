/* eslint-disable jsx-a11y/media-has-caption */
import {
  ReactNode, useEffect, useMemo, useRef,
} from 'react';
import { gsap } from 'gsap';
import cx from 'classnames';

import './ImageCrop.scss';
import { ImgSingleProp } from '../../interface';
import useSize from '../../hooks/useSize';

interface Props {
  preview: ImgSingleProp;
  children?: ReactNode;
}

const ImageCrop = ({
  preview, children = null,
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

  const onLoad = () => {
    videoRef.current?.play();
  };

  return (
    <div ref={ref} className={cx('image-crop', { 'is-mobile': type === 'mobile' })}>
      {isVideo
        ? (
          <video
            ref={videoRef}
            autoPlay
            onLoad={onLoad}
            loop
            muted
            width={preview?.width}
            height={preview?.height}
          >
            <source src={src} />
          </video>
        )
        : <img src={src} srcSet={srcSet} alt="" width={preview?.width} height={preview?.height} />}
      {children}
    </div>
  );
};

export default ImageCrop;
