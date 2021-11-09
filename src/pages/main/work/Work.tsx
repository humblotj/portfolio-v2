import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import './Work.scss';
import { WorkProps } from '../../../interface';
import { selectWorksSorted } from '../../../store/store';
import WorkItem from './components/WorkItem';

const Work = forwardRef<HTMLElement>((_, ref) => {
  const works = useSelector(selectWorksSorted);

  return (
    <section className="work-sec" ref={ref}>
      <h2 className="heading">
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
