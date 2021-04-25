import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './ScrollTo.scss';

interface Props {
  to: any,
  children?: ReactNode
}

const ScrollTo = ({ to, children = null }: Props) => (
  <div className="scroll-to">
    <Link to={to}>
      {children}
      <div className="scroll-stroke">
        <div />
      </div>
    </Link>
  </div>
);

export default ScrollTo;
