import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import './BackArrow.scss';

interface Props {
    children?: ReactNode,
    to?: string,
    direction?: string,
    disabled?: boolean
}

const BackArrow = ({
  children = null, to = '/', direction = 'left', disabled = false,
}: Props) => (
  <Link className={cx('back-arrow', direction, { disabled })} to={to}>
    {children}
  </Link>
);

export default BackArrow;
