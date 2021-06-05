/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import './BackArrow.scss';

interface Props {
    className?: string,
    children?: ReactNode,
    to?: string,
    direction?: string,
    disabled?: boolean
}

const BackArrow = ({
  className = '', children = null, to = '/', direction = 'left', disabled = false, ...rest
}: Props) => (
  <Link className={cx('back-arrow', className, direction, { disabled })} to={to} {...rest}>
    {children}
  </Link>
);

export default BackArrow;
