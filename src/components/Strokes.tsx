import cx from 'classnames';

import './Strokes.scss';

interface Props {
    secondary?: boolean
    style?: any
}

const Strokes = ({ secondary = false, style }: Props) => (
  <div className={cx('strokes', { secondary })} style={style} aria-hidden>
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Strokes;
