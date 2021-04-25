import { useRef } from 'react';
import cx from 'classnames';
import { Parallax } from 'react-parallax';

import './ImageWrap.scss';
import image from '../../assets/test.jpeg';
import image2 from '../../assets/test1.jpeg';
import useSize from '../../hooks/useSize';

interface Props {
  isMobile?: boolean
  isParallax?: boolean
}

const ImageWrap = ({ isMobile = false, isParallax = false }: Props) => {
  const ref = useRef<any>(null);
  const [width] = useSize(ref);

  return (
    <div
      ref={ref}
      className={cx('image-wrap', { 'is-mobile': isMobile })}
      style={{ height: width * (isMobile ? 1.6417 : 0.5925) }}
    >
      <div className="image-crop">
        {isParallax ? (
          <Parallax
            bgImage={image2}
            strength={200}
          />
        )
          : <img src={isMobile ? image2 : image} alt="" /> }
      </div>
    </div>
  );
};

export default ImageWrap;
