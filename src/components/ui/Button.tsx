/* eslint-disable react/button-has-type */
import { ReactNode } from 'react';
import cx from 'classnames';

import './Button.scss';
interface Props {
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  color?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  type = 'button',
  className = '',
  onClick = () => {},
  children = null,
  color = 'primary',
  disabled = false,
}) => (
  <button
    type={type}
    className={cx('btn', className, color)}
    onClick={onClick}
    data-text={children}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
