import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { gsap } from 'gsap';
import cx from 'classnames';

import './Loading.scss';
import Strokes from '../molecules/Strokes';
import {
  onChangeLoading,
  selectIsInit,
  selectIsLoading,
} from '../../store/store';

gsap.registerEffect({
  name: 'counter',
  extendTimeline: true,
  defaults: {
    end: 0,
    duration: 1,
    ease: 'power3.out',
    increment: 1,
  },
  effect: (targets: HTMLElement[], config: gsap.TweenVars) => {
    const tl = gsap.timeline();
    const num = targets[0].innerText.replace(/,/g, '');
    targets[0].innerText = num;

    tl.to(
      targets,
      {
        duration: config.duration,
        innerText: config.end as number,
        // snap:{innerText:config.increment},
        modifiers: {
          innerText(innerText) {
            return gsap.utils
              .snap(config.increment, innerText)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          },
        },
        ease: config.ease,
      },
      0,
    );

    return tl;
  },
});

const Loading = () => {
  const isInit = useSelector(selectIsInit);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();
  const dispatch = useDispatch();

  const background = location.pathname === '/' ? '#23282a' : '#fff';

  useEffect(() => {
    setTimeout(() => dispatch(onChangeLoading(true)), 0);
    if (!isInit) {
      const tl = gsap.timeline();
      tl.to(
        document.querySelector('.counter'),
        { y: 0, duration: 1, ease: 'power3.out' },
        0,
      );
      tl.counter(document.querySelector('.counter'), { end: 99 }, '<');
    }
  }, []);

  return (
    <div
      className={cx('loading', { 'is-loading': isLoading })}
      style={{ background }}
      data-testid="loading"
    >
      <Strokes secondary={location.pathname === '/'} />
      <div className="before" aria-hidden>
        <Strokes />
      </div>
      <div className="after" aria-hidden>
        <Strokes />
      </div>
      {!isInit && (
        <div className="loader">
          <div className="counter">0</div>
        </div>
      )}
    </div>
  );
};

export default Loading;
