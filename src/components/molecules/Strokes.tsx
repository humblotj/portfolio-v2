import cx from 'classnames';

import './Strokes.scss';

interface Props {
  secondary?: boolean;
  style?: React.CSSProperties;
}

const Strokes: React.FC<Props> = ({ secondary = false, style }) => (
  <div
    className={cx('strokes', { secondary })}
    style={style}
    aria-hidden
    data-testid="strokes"
  >
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Strokes;
