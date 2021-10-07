import { forwardRef, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { gsap } from 'gsap';

import './Work.scss';
import { WorkProps } from '../../../interface';
import { selectWorksSorted } from '../../../store/store';
import WorkItem from './components/WorkItem';
import Strokes from '../../../components/Strokes';

const Work = forwardRef<HTMLElement>((props, ref) => {
  const works = useSelector(selectWorksSorted);
  const workHeaderRef = useRef<HTMLDivElement>(null);
  console.log('woork');

  useEffect(() => {
    const element = workHeaderRef.current;
    if (!element) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
      },
      defaults: {
        opacity: 0,
        duration: 0.75,
      },
    });
    tl.from(element.querySelector('h2'), { x: '300px' }, 0);
    tl.from(element.querySelector('.divider'), { x: '-300px' }, 0.25);
    tl.from(element.querySelector('.work-tag'), { x: '-100px' }, 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="work-sec" ref={ref}>
      <Strokes />
      <div className="work-content">
        <div ref={workHeaderRef} className="work-header">
          <span className="work-tag">Portfolio</span>
          <br />
          <h2>My work:</h2>
          <br />
          <div className="divider" aria-hidden />
        </div>
        <ul>
          {works.map((work: WorkProps, index: number) => (
            <WorkItem
              key={work.name}
              id={work.id || ''}
              work={work}
              index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
});

export default Work;
