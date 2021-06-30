import {
  useEffect, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import './Loading.scss';
import Strokes from './Strokes';
import { selectIsInit } from '../store/store';

interface Props {
  enableComponent: () => void,
  hasImportFinished: boolean
}

const Loading = ({ enableComponent, hasImportFinished }: Props) => {
  const isInit = useSelector(selectIsInit);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const background = location.pathname === '/' ? '#23282a' : '#fff';

  useEffect(() => {
    setTimeout(() => setIsLoading(true), 0);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (hasImportFinished) {
      setIsLoading(false);
      setTimeout(() => enableComponent(), 300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasImportFinished]);

  return (
    <div ref={ref} className={cx('loading', { 'is-loading': isLoading || !isInit })} style={{ background }}>
      <Strokes secondary={location.pathname === '/'} />
      <div className="before" aria-hidden>
        <Strokes />
      </div>
      <div className="after" aria-hidden>
        <Strokes />
      </div>
      {!isInit && (
      <div className="loader">
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
      </div>
      )}
    </div>
  );
};

export default Loading;
