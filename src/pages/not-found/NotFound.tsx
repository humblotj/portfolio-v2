import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import './NotFound.scss';
import notFound from '../../assets/not-found.json';
import BackArrow from '../../components/atoms/BackArrow';
import useAnimation from '../../hooks/useAnimation';

const NotFound = () => {
  const lottieRef = useRef<HTMLDivElement>(null);
  const { skipBlink } = useAnimation();

  useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef.current as Element,
      renderer: 'svg',
      animationData: notFound,
      autoplay: true,
      loop: false,
    });

    return skipBlink();
  }, []);

  return (
    <section className="not-found-sec">
      <BackArrow>Turn Back Home</BackArrow>
      <div ref={lottieRef} className="not-found-animation" />
    </section>
  );
};

export default NotFound;
