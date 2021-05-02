import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

  const background = location.pathname === '/' ? '#23282a' : '#fff';

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    gsap.to(element,
      {
        background,
        zIndex: 1000,
        duration: 0,
      });
    gsap.fromTo(element.querySelector('.loader > div'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: isInit ? 0.3 : 0,
      });
    gsap.fromTo(element.querySelector('.before'),
      {
        y: '-100%',
      },
      {
        y: 0,
        duration: isInit ? 0.3 : 0,
      });
    gsap.fromTo(element.querySelector('.after'),
      {
        y: '100%',
      },
      {
        y: 0,
        duration: isInit ? 0.3 : 0,
      });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (hasImportFinished) {
      gsap.fromTo(element,
        {
          zIndex: 1,
          background,
        },
        {
          zIndex: 0,
          duration: 0.3,
          background,
        });
      gsap.fromTo(element.querySelectorAll('.loader > div'),
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.3,
        });
      gsap.fromTo(element.querySelector('.before'),
        {
          y: 0,
        },
        {
          y: '-100%',
          duration: 0.3,
        });
      gsap.fromTo(element.querySelector('.after'),
        {
          y: 0,
        },
        {
          y: '100%',
          duration: 0.3,
          onComplete: () => enableComponent(),
        });
    }
  }, [hasImportFinished]);

  return (

    <div ref={ref} className="loading">
      <Strokes secondary={location.pathname === '/'} />
      <div className="before" aria-hidden>
        <Strokes />
      </div>
      <div className="after" aria-hidden>
        <Strokes />
      </div>
      <div className="loader">
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
      </div>
    </div>
  );
};

export default Loading;
