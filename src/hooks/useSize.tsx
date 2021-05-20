/* eslint-disable consistent-return */
import {
  useLayoutEffect, useState, useCallback, RefObject,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useSize = (
  ref?: RefObject<HTMLElement>,
  callback?: (entry: DOMRectReadOnly) => void,
) => {
  if (!ref) {
    const { innerWidth: width, innerHeight: height } = window;
    return [width, height];
  }

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries)) {
        return;
      }

      const entry = entries[0];
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);

      if (callback) {
        callback(entry.contentRect);
      }
    },
    [callback],
  );

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    let RO: ResizeObserver|null = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => handleResize(entries),
    );
    RO.observe(ref.current);

    return () => {
      RO?.disconnect();
      RO = null;
    };
  }, [ref]);

  return [width, height];
};

export default useSize;
