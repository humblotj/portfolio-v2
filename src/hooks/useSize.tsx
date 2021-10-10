/* eslint-disable consistent-return */
import { useLayoutEffect, useState, useCallback, RefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useSize = (ref?: RefObject<HTMLElement>) => {
  const [size, setSize] = useState(
    ref ? [0, 0] : [window.innerWidth, window.innerHeight],
  );

  const handleResize = useCallback(
    (entries?: ResizeObserverEntry[]) => {
      if (!ref?.current) {
        setSize([window.innerWidth, window.innerHeight]);
      }

      if (!Array.isArray(entries)) {
        return;
      }

      const entry = entries[0];
      setSize([entry.contentRect.width, entry.contentRect.height]);
    },
    [ref],
  );

  useLayoutEffect(() => {
    if (!ref?.current) {
      window.addEventListener('resize', handleResize as any);
      return () => window.removeEventListener('resize', handleResize as any);
    }

    let RO: ResizeObserver | null = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => handleResize(entries),
    );
    RO.observe(ref.current);

    return () => {
      RO?.disconnect();
      RO = null;
    };
  }, [ref, handleResize]);

  return size;
};

export default useSize;
