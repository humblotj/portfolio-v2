import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import './Loading.scss';
import Strokes from './Strokes';
import { onSetLoading, selectIsInit, selectIsLoading } from '../store/store';

const Loading = () => {
  const isInit = useSelector(selectIsInit);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();
  const dispatch = useDispatch();

  const background = location.pathname === '/' ? '#23282a' : '#fff';

  useEffect(() => {
    setTimeout(() => dispatch(onSetLoading(true)), 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('loading', { 'is-loading': isLoading })} style={{ background }}>
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
