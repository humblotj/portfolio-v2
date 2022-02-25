import './WorkDetailFooter.scss';

import { Link } from 'react-router-dom';

import Strokes from 'components/molecules/Strokes';
import { WorkDetailProps } from 'interface';

interface Props {
  work: WorkDetailProps;
}

const WorkDetailFooter = ({ work }: Props) => {
  const { previousWork, nextWork, index } = work;

  return (
    <div className="project-controls">
      <Strokes />
      <div className="project-controls-inner">
        {nextWork ? (
          <Link to={'/work/' + nextWork} className="previous-work">
            <strong>{nextWork}</strong>
            <span>Previous work</span>
          </Link>
        ) : (
          <div />
        )}
        <p>{10 - index + 1}/10</p>
        {previousWork && (
          <Link to={'/work/' + previousWork}>
            <strong>{previousWork}</strong>
            <span>Next work</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default WorkDetailFooter;
