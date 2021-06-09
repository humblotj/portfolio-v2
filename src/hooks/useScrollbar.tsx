import Scrollbar from 'smooth-scrollbar';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { use100vh } from 'react-div-100vh';

import useSize from './useSize';

const useScrollbar = () => {
  const height = use100vh();
  const [width] = useSize();

  const scrollBarListener = (status: any) => {
    const { offset } = status;

    document.querySelectorAll<HTMLElement>('.fixed').forEach((el) => {
      if (el.dataset.top) {
        el.style.top = `${+el.dataset.top + offset.y}px`;
      }
      if (el.dataset.bottom) {
        el.style.bottom = 'auto';
        if (height) {
          el.style.top = `${height - +el.dataset.bottom - offset.y + el.offsetHeight}`;
        } else {
          el.style.top = `calc(100vh - ${+el.dataset.bottom - offset.y + el.offsetHeight}px)`;
        }
      }
    });

    ScrollTrigger.update();
  };

  const onDestroyScrollbar = () => {
    const bodyScrollbar = Scrollbar.get(document.body);
    if (bodyScrollbar) {
      bodyScrollbar.destroy();
    }
  };

  const onInitScrollbar = () => {
    // if (width < 768) {
    //   document.body.style.height = 'auto';
    //   return;
    // }

    const bodyScrollbar = Scrollbar.init(document.body, { damping: 0.4, delegateTo: document });

    window.scrollTo(0, 0);
    bodyScrollbar.setPosition(0, 0);
    bodyScrollbar.track.xAxis.element.remove();

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          bodyScrollbar.scrollTop = value as any;
        }
        return bodyScrollbar.scrollTop;
      },
    });

    bodyScrollbar.addListener(scrollBarListener);
    ScrollTrigger.defaults({ scroller: document.body });
  };

  const onListenerTrigger = () => {
    const bodyScrollbar = Scrollbar.get(document.body);
    if (bodyScrollbar) {
      scrollBarListener(
        { offset: bodyScrollbar.offset, limit: bodyScrollbar.limit },
      );
    }
  };

  return { onInitScrollbar, onDestroyScrollbar, onListenerTrigger };
};

export default useScrollbar;
