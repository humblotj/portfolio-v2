import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './BackArrow.scss';

interface Props {
    children?: ReactNode
}

const BackArrow = ({ children = null }: Props) => (
  <Link className="back-arrow" to="/">
    {children}
  </Link>
);

export default BackArrow;
