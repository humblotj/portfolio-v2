import Scrollbar from 'smooth-scrollbar';
import ScrollTrigger from 'gsap/ScrollTrigger';
import useSize from './useSize';

const scrollBarListener = (status: any) => {
  const { offset } = status;

  document.querySelectorAll<HTMLElement>('.fixed').forEach((el) => {
    if (el.dataset.top) {
      el.style.top = `${+el.dataset.top + offset.y}px`;
    }
    if (el.dataset.bottom) {
      el.style.bottom = 'auto';
      el.style.top = `calc(100vh - ${+el.dataset.bottom - offset.y + el.offsetHeight}px)`;
    }
  });

  ScrollTrigger.update();
};

const resetStyle = () => {
  document.querySelectorAll<HTMLElement>('.fixed').forEach((el) => {
    if (el.dataset.top) {
      el.style.top = `${+el.dataset.top}px`;
    }
    if (el.dataset.bottom) {
      el.style.bottom = `${+el.dataset.bottom}px`;
      el.style.top = 'auto';
    }
  });
};

const useScrollbar = () => {
  const [width] = useSize();

  const onDestroyScrollbar = () => {
    const bodyScrollbar = Scrollbar.get(document.body);
    if (bodyScrollbar) {
      bodyScrollbar.destroy();
    }
  };

  const onInitScrollbar = () => {
    if (width < 768) {
      return;
    }

    const bodyScrollbar = Scrollbar.init(document.body, { damping: 0.2, delegateTo: document });

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
