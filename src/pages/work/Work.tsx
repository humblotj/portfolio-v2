import { FirestoreCollection } from '@react-firebase/firestore';
import gsap from 'gsap/all';
import { forwardRef, useEffect, useRef } from 'react';
import { WorkProps } from '../../interface';
import WorkItem from './components/WorkItem';
import './Work.scss';

const Work = forwardRef<HTMLElement>((props, ref) => {
  const workHeaderRef = useRef<HTMLDivElement>(null);

  const animate = (element: HTMLElement) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
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
    tl.fromTo(element.querySelector('h4'),
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
          <h4>Portfolio</h4>
          <h2>My work:</h2>
          <div className="divider" aria-hidden />
        </div>
        <ul>
          <FirestoreCollection path="/projects/" orderBy={[{ field: 'order', type: 'desc' }]}>
            {(d) => (d.isLoading ? 'Loading'
              : d.value.map((work: WorkProps,
                index: number) => (
                  <WorkItem
                    key={work.name}
                    id={d.ids[index]}
                    work={work}
                    index={index}
                  />
              )))}
          </FirestoreCollection>
        </ul>
      </div>
    </section>
  );
});

export default Work;
