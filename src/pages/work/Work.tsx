import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useSelector } from 'react-redux';

import { WorkProps } from '../../interface';
import { selectWorksSorted } from '../../store/store';
import WorkItem from './components/WorkItem';
import './Work.scss';

const Work = forwardRef<HTMLElement>((props, ref) => {
  const works = useSelector(selectWorksSorted);
  const workHeaderRef = useRef<HTMLDivElement>(null);

  const animate = (element: HTMLElement) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
      },
    });
    tl.addLabel('start');
    tl.fromTo(element.querySelector('h2'),
      {
        opacity: 0,
        x: '300px',
      },
      {
        opacity: 1,
        x: '0',
        duration: 0.75,
      }, 'start');
    tl.fromTo(element.querySelector('.divider'),
      {
        opacity: 0,
        x: '-300px',
      },
      {
        opacity: 1,
        x: '0',
        duration: 0.75,
        delay: 0.25,
      }, 'start');
    tl.fromTo(element.querySelector('.work-tag'),
      {
        opacity: 0,
        x: '-300px',
      },
      {
        opacity: 1,
        x: '0',
        duration: 0.75,
        delay: 0.5,
      }, 'start');
  };

  useEffect(() => {
    const element = workHeaderRef.current;
    if (!element) {
      return;
    }
    setTimeout(() => animate(element), 100);
  }, []);

  return (
    <section className="work-sec" ref={ref}>
      <div className="work-content">
        <div ref={workHeaderRef} className="work-header">
          <span className="work-tag">Portfolio</span>
          <h2>My work:</h2>
          <div className="divider" aria-hidden />
        </div>
        <ul>
          {works.map((work: WorkProps,
            index: number) => (
              <WorkItem
                key={work.name}
                id={work.id as string}
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
