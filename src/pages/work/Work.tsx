import { forwardRef } from 'react';
import WorkItem from './components/WorkItem';
import './Work.scss';

const Work = forwardRef<HTMLElement>((props, ref) => (
  <section className="work-sec" ref={ref}>
    <div className="work-content">
      <div className="work-header">
        <h4>Portfolio</h4>
        <h2>My work:</h2>
      </div>
      <ul>
        {[0, 1, 2].map((i) => <WorkItem key={i} index={i} />)}
      </ul>
    </div>
  </section>
));

export default Work;
