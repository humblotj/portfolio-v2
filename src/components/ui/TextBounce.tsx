import { Fragment } from 'react';

import Bounce from './Bounce';

interface Props {
  text: string;
}

const TextBounce: React.FC<Props> = ({ text }) => (
  <>
    {[...text].map((c, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        {c === ' ' ? '\u00a0' : <Bounce>{c}</Bounce>}
      </Fragment>
    ))}
  </>
);

export default TextBounce;
