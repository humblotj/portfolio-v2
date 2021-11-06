import { forwardRef, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { gsap } from 'gsap';

import './Work.scss';
import { WorkProps } from '../../../interface';
import { selectWorksSorted } from '../../../store/store';
import WorkItem from './components/WorkItem';

const Work = forwardRef<HTMLElement>((_, ref) => {
  const works = useSelector(selectWorksSorted);
  const workHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = workHeaderRef.current!;

    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      scrollTrigger: {
        trigger: element,
        start: `${(element.offsetHeight + window.innerHeight) * 0.1} bottom`,
      },
    });
  }, []);

  return (
    <section className="work-sec" ref={ref}>
      <h2 ref={workHeaderRef} className="heading">
        A selection of
        <br />
        my projects
      </h2>
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
    </section>
  );
});

Work.displayName = 'Work';

export default Work;
