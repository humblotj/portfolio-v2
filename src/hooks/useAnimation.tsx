import { gsap } from 'gsap';
import { useCallback } from 'react';

const useAnimation = () => {
  const revealText = useCallback(
    (
      el: Element | null,
      {
        delay,
        trigger,
        scroller,
        ...rest
      }: {
        delay?: number;
        scroller?: gsap.DOMTarget;
        trigger?: gsap.DOMTarget;
      } = {
        delay: 0,
        scroller: null,
        trigger: null,
      },
    ) => {
      const tl = gsap.timeline({
        scrollTrigger: trigger
          ? {
              trigger,
              scroller,
              ...rest,
            }
          : undefined,
        defaults: {
          ease: 'power3.inOut',
        },
      });

      if (el) {
        const mask = el.querySelector('.reveal-mask');
        if (mask) {
          tl.to(mask, {
            scaleX: 1,
            duration: 0.6,
            delay,
          });
          tl.to(
            mask,
            {
              scaleX: 0,
              transformOrigin: '100% 50%',
              duration: 0.2,
            },
            '+=0.3',
          );
        }
        tl.to(
          el.querySelector('.reveal-text'),
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power4.out',
          },
          mask ? '>' : 1.2 + delay!,
        );
      }

      return tl;
    },
    [],
  );

  const animateBlink = useCallback((trigger: Element) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
      },
    });

    const blink = document.querySelectorAll('.blink');
    tl.fromTo(
      blink,
      {
        opacity: 0,
        pointerEvents: 'none',
      },
      {
        opacity: 0.8,
        duration: 0.1,
        pointerEvents: 'auto',
      },
    );
    tl.to(blink, {
      opacity: 0.1,
      duration: 0.1,
    });
    tl.to(blink, {
      opacity: 0.8,
      duration: 0.1,
    });
    tl.to(blink, {
      opacity: 0.2,
      duration: 0.2,
    });
    tl.to(blink, {
      opacity: 1,
      duration: 0.4,
    });
  }, []);

  return {
    revealText,
    animateBlink,
  };
};

export default useAnimation;
