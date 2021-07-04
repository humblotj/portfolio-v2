import { useEffect, useRef } from 'react';

import './Phone.scss';
import { ImgSingleProp } from '../../interface';
import ImageCrop from './ImageCrop';
import PhoneMockup from '../../assets/phone-mockup.png';
import PhoneMockup300 from '../../assets/phone-mockup-300.png';
import useAnimation from '../../hooks/useAnimation';

interface Props {
  preview: ImgSingleProp;
    startAnimation: boolean;
    noAnimation?: boolean;
    lazyload?: boolean;
}

const Phone = ({
  preview, startAnimation = false, noAnimation = false, lazyload = false,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { gsap } = useAnimation();

  useEffect(() => {
    const element = ref.current;
    if (!element || !startAnimation) {
      return;
    }
    if (noAnimation) {
      gsap.set(element.querySelector('.phone-overlay'), { opacity: 0 });
    } else {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'bottom bottom',
        },
      });

      tl.to(element.querySelector('.phone-overlay'), { opacity: 0, duration: 0.9 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation]);

  return (
    <div
      ref={ref}
      className="phone"
    >
      <img src={PhoneMockup} srcSet={`${PhoneMockup300} 300w, ${PhoneMockup} 653w`} alt="mockup" className="phone-mockup" width="460" height="720" />
      <ImageCrop
        preview={preview}
        lazyload={lazyload}
      >
        <div className="phone-overlay" />
      </ImageCrop>

    </div>
  );
};

export default Phone;
