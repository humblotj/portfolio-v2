import { memo } from 'react';

import { ImgSingleProp } from 'interface';
import Laptop from './Laptop';
import Phone from './Phone';

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
