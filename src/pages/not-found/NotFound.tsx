import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { gsap } from 'gsap';

import './NotFound.scss';
import notFound from '../../assets/not-found.json';
import BackArrow from '../../components/ui/BackArrow';

const NotFound = () => {
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef.current as Element,
      renderer: 'svg',
      animationData: notFound,
      autoplay: true,
      loop: false,
    });

    const blink = document.querySelectorAll('.blink');
    gsap.to(blink, { opacity: 1, duration: 0 });

    return () => {
      gsap.to(blink, { opacity: 0, duration: 0 });
    };
  }, []);

  return (
    <section className="not-found-sec">
      <BackArrow>
        Turn Back Home
      </BackArrow>
      <div ref={lottieRef} className="not-found-animation" />
    </section>
  );
};

export default NotFound;
