/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactNode } from 'react';

import './FakeLink.scss';

interface Props {
  className?: string,
  onClick?:()=> void,
  children: ReactNode
}

const FakeLink = ({
  className = '', onClick = () => {}, children,
}: Props) => {
  const onFakeLinkClick = (e: any) => {
    e.preventDefault();
    onClick();
  };

  return (
    <a href="" className={className} onClick={onFakeLinkClick}>{children}</a>
  );
};

export default FakeLink;
