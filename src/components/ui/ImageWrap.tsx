import Phone from './Phone';
import Laptop from './Laptop';
import { ImgSingleProp } from '../../interface';

interface Props {
preview: ImgSingleProp;
  startAnimation?: boolean
  noAnimation?: boolean,
  lazyload?: boolean,
}

const ImageWrap = ({
  preview, startAnimation = false, noAnimation = false, lazyload = false,
}: Props) => {
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

export default ImageWrap;
