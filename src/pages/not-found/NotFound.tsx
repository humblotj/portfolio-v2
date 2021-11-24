import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import './NotFound.scss';
import notFound from '../../assets/not-found.json';
import BackArrow from '../../components/atoms/BackArrow';
import useDispatchInit from '../../hooks/useDispatchInit';

const useAnimateOnInit = (lottieRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef.current as Element,
      renderer: 'svg',
      animationData: notFound,
      autoplay: true,
      loop: false,
    });
  }, []);
};

const NotFound = () => {
  const lottieRef = useRef<HTMLDivElement>(null);
  useAnimateOnInit(lottieRef);
  useDispatchInit();

  return (
    <section className="not-found-sec">
      <BackArrow>Turn Back Home</BackArrow>
      <div ref={lottieRef} className="not-found-animation" />
    </section>
  );
};

export default NotFound;
