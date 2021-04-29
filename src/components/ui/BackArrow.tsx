import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import './BackArrow.scss';

interface Props {
    children?: ReactNode,
    to?: string,
    direction?: string
}

const BackArrow = ({ children = null, to = '/', direction = 'left' }: Props) => (
  <Link className={cx('back-arrow', direction)} to={to}>
    {children}
  </Link>
);

export default BackArrow;
