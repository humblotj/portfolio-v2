import { ReactNode, cloneElement } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  color?: string;
  noMask?: boolean;
  children: ReactNode;
}

const RevealText = ({
  className = '',
  color = '',
  noMask = false,
  children,
}: Props) => {
  const revealText = cloneElement(children as any, {
    className: 'reveal-text',
  });

  return (
    <div className={cx('reveal', className, color, { 'no-mask': noMask })}>
      {revealText}
      {!noMask && <div className="reveal-mask" aria-hidden />}
    </div>
  );
};

export default RevealText;
