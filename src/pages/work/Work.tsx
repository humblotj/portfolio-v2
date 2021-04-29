import gsap from 'gsap/all';
import { forwardRef, useEffect, useRef } from 'react';
import WorkItem from './components/WorkItem';
import './Work.scss';

const Work = forwardRef<HTMLElement>((props, ref) => {
  const workHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = workHeaderRef.current;
    if (element) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 75%',
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
    }
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
          {[0, 1, 2].map((i) => <WorkItem key={i} index={i} />)}
        </ul>
      </div>
    </section>
  );
});

export default Work;
