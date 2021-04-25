/* eslint-disable react/button-has-type */
import { ReactNode } from 'react';
import cx from 'classnames';

import './Button.scss';

interface Props {
    type?: 'button' | 'submit',
    onClick?: () => void,
    children?: ReactNode,
    color?: string,
}

const Button = ({
  type = 'button', onClick = () => {}, children = null, color = 'primary',
}: Props) => (
  <button
    type={type}
    className={cx('btn', color)}
    onClick={onClick}
    data-text={children}
  >
    {children}
  </button>
);

export default Button;
