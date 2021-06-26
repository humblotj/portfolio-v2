import Phone from './Phone';
import Laptop from './Laptop';
import { ImgSingleProp } from '../../interface';

interface Props {
preview: ImgSingleProp;
  startAnimation?: boolean
  noAnimation?: boolean
}

const ImageWrap = ({
  preview, startAnimation = false, noAnimation = false,
}: Props) => {
  if (preview?.type === 'mobile') {
    return (
      <Phone
        preview={preview}
        startAnimation={startAnimation}
        noAnimation={noAnimation}
      />
    );
  }

  return (
    <Laptop
      preview={preview}
      startAnimation={startAnimation}
      noAnimation={noAnimation}
    />
  );
};

export default ImageWrap;
