import { useCallback } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useAnimation = () => {
  const animateReveal = useCallback((el: Element | null,
    { delay, trigger } = { delay: 0, trigger: null }) => {
    const tl = gsap.timeline({
      scrollTrigger: trigger ? {
        trigger,
      } : undefined,
      defaults: {
        ease: 'power3.inOut',
      },
    });

    if (el) {
      const mask = el.querySelector('.reveal-mask');
      if (mask) {
        tl.to(
          mask,
          {
            scaleX: 1,
            duration: 0.6,
            delay,
          },
        );
        tl.to(
          mask,
          {
            scaleX: 0,
            transformOrigin: '100% 50%',
            duration: 0.4,
          },
          '+=0.4',
        );
      }
      tl.to(
        el.querySelector('.reveal-text'),
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
        },
        mask ? '<0.15' : 1.2 + delay,
      );
    }

    return tl;
  }, []);

  const animateBlink = useCallback((trigger: Element) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
      },
    });

    const blink = document.querySelectorAll('.blink');
    tl.fromTo(blink,
      {
        autoAlpha: 0,
        pointerEvents: 'none',
      },
      {
        autoAlpha: 0.8,
        duration: 0.1,
        pointerEvents: 'auto',
      }, 1.55 + 0.2 + 0.12 * 3);
    tl.to(blink,
      {
        autoAlpha: 0.1,
        duration: 0.1,
      });
    tl.to(blink,
      {
        autoAlpha: 0.8,
        duration: 0.1,
      });
    tl.to(blink,
      {
        autoAlpha: 0.2,
        duration: 0.2,
      });
    tl.to(blink,
      {
        autoAlpha: 1,
        duration: 0.4,
      });
  }, []);

  const skipBlink = useCallback(() => {
    const blink = document.querySelectorAll('.blink');
    gsap.to(blink, { opacity: 1, duration: 0 });
    return () => {
      gsap.to(blink, { opacity: 0, duration: 0 });
    };
  }, []);

  return {
    animateReveal, animateBlink, skipBlink, gsap,
  };
};

export default useAnimation;
