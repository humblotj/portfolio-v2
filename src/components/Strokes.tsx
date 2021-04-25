import cx from 'classnames';

import './Strokes.scss';

interface Props {
    secondary?: boolean
}

const Strokes = ({ secondary = false }: Props) => (
  <div className={cx('strokes', { secondary })}>
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Strokes;
