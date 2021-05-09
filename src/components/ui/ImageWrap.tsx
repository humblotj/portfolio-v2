import Phone from './Phone';
import Laptop from './Laptop';

interface Props {
  src?: string
  isMobile?: boolean
  isParallax?: boolean
  startAnimation?: boolean
  noAnimation?: boolean
}

const ImageWrap = ({
  src = '', isMobile = false, isParallax = false, startAnimation = false, noAnimation = false,
}: Props) => {
  if (isMobile) {
    return (
      <Phone
        src={src}
        startAnimation={startAnimation}
        noAnimation={noAnimation}
        isParallax={isParallax}
      />
    );
  }

  return (
    <Laptop
      src={src}
      startAnimation={startAnimation}
      noAnimation={noAnimation}
      isParallax={isParallax}
    />
  );
};

export default ImageWrap;
