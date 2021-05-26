import { ReactNode } from 'react';
import FakeLink from './FakeLink';

import './ScrollTo.scss';

interface Props {
  onClick: () => void,
  children?: ReactNode
}

const ScrollTo = ({ onClick, children = null }: Props) => (
  <div className="scroll-to">
    <FakeLink onClick={onClick}>
      {children}
      <div className="scroll-stroke">
        <div />
      </div>
    </FakeLink>
  </div>
);

export default ScrollTo;
