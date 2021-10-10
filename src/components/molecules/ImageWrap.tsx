import { memo } from 'react';

import Phone from './Phone';
import Laptop from './Laptop';
import { ImgSingleProp } from '../../interface';

interface Props {
  preview: ImgSingleProp;
  startAnimation?: boolean;
  noAnimation?: boolean;
  lazyload?: boolean;
}

const ImageWrap: React.FC<Props> = ({
  preview,
  startAnimation = false,
  noAnimation = false,
  lazyload = false,
}) => {
  if (preview?.type === 'mobile') {
    return (
      <Phone
        preview={preview}
        startAnimation={startAnimation}
        noAnimation={noAnimation}
        lazyload={lazyload}
      />
    );
  }

  return (
    <Laptop
      preview={preview}
      startAnimation={startAnimation}
      noAnimation={noAnimation}
      lazyload={lazyload}
    />
  );
};

export default memo(ImageWrap);
