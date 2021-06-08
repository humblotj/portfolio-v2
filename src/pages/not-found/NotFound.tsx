import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { gsap } from 'gsap';
import { use100vh } from 'react-div-100vh';

import './NotFound.scss';
import notFound from '../../assets/not-found.json';
import BackArrow from '../../components/ui/BackArrow';

const NotFound = () => {
  const lottieRef = useRef<HTMLDivElement>(null);
  const height = use100vh();

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
    <section className="not-found-sec" style={{ height: height as number }}>
      <BackArrow>
        Turn Back Home
      </BackArrow>
      <div ref={lottieRef} className="not-found-animation" />
    </section>
  );
};

export default NotFound;
