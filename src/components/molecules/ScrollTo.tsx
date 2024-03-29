import './ScrollTo.scss';

import { ReactNode } from 'react';

import FakeLink from '../atoms/FakeLink';

interface Props {
  onClick: () => void;
  children: ReactNode;
}

const ScrollTo: React.FC<Props> = ({ onClick, children }) => (
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
