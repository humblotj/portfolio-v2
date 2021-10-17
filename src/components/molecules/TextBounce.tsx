import { Fragment } from 'react';

import Bounce from '../atoms/Bounce';

interface Props {
  text: string;
}

const TextBounce: React.FC<Props> = ({ text }) => (
  <>
    {[...text].map((c, index) => (
      <Fragment key={index}>
        {c === ' ' ? '\u00a0' : <Bounce>{c}</Bounce>}
      </Fragment>
    ))}
  </>
);

export default TextBounce;
