import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useSize from '../../hooks/useSize';
import ImageCrop from './ImageCrop';
import PhoneMockup from '../../assets/phone-mockup.png';
import './Phone.scss';

interface Props {
    src: string;
    startAnimation: boolean;
    noAnimation?: boolean;
    isParallax?: boolean;
}

const Phone = ({
  src, startAnimation = false, noAnimation = false, isParallax = false,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width] = useSize(ref);

  useEffect(() => {
    const element = ref.current;
    if (!element || !startAnimation) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'bottom bottom',
      },
    });

    tl.to(element.querySelector('.phone-overlay'),
      {
        opacity: 0,
        duration: noAnimation ? 0 : 0.9,
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation]);

  return (
    <div
      ref={ref}
      className="phone"
      style={{ height: width * 1.5778 }}
    >
      <img src={PhoneMockup} alt="mockup" className="phone-mockup" />
      <ImageCrop
        src={src}
        isMobile
        isParallax={isParallax}
      >
        <div className="phone-overlay" />
      </ImageCrop>

    </div>
  );
};

export default Phone;
