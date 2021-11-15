import { ReactNode, MouseEvent } from 'react';

import './FakeLink.scss';
interface Props {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

const FakeLink: React.FC<Props> = ({
  className,
  onClick = () => {},
  children,
}: Props) => {
  const onFakeLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <a href="" className={className} onClick={onFakeLinkClick}>
      {children}
    </a>
  );
};

export default FakeLink;
