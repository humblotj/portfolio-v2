/* eslint-disable react/button-has-type */
import { ReactNode } from 'react';
import cx from 'classnames';

import './Button.scss';

interface Props {
    type?: 'button' | 'submit',
    onClick?: () => void,
    children?: ReactNode,
    color?: string,
    disabled?: boolean
}

const Button = ({
  type = 'button', onClick = () => {}, children = null, color = 'primary', disabled = false,
}: Props) => (
  <button
    type={type}
    className={cx('btn', color)}
    onClick={onClick}
    data-text={children}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
