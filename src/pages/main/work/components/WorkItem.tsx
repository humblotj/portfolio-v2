import 'lazysizes';
import './WorkItem.scss';

import cx from 'classnames';
import { gsap } from 'gsap';
import { memo, Suspense, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import lazyWithRetry from 'utils/lazyWithRetry';

import ImageWrap from 'components/molecules/ImageWrap';
import useSize from 'hooks/useSize';
import { WorkProps } from 'interface';

const TechIcon = lazyWithRetry(() => import('components/atoms/TechIcon'));

const useAnimateOnScrollIn = (
  ref: React.RefObject<HTMLLIElement>,
  index: number,
) => {
  const [width] = useSize();

  useEffect(() => {
    const element = ref.current!;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: '35% bottom',
      },
    });
    const isLargeWidth = width > 900;
    const isOdd = index % 2 === 1;

    tl.to(
      element.querySelector('.work-item-mask'),
      {
        x: '100%',
        duration: 0.4,
      },
      !isLargeWidth || !isOdd ? 0 : 0.3,
    );
    tl.to(
      element.querySelectorAll('.work-item-title > *, .work-tag, ul'),
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.2,
        ease: 'power3.out',
      },
      '<0.2',
    );
    tl.to(
      element.querySelector('.work-preview'),
      {
        opacity: 1,
        x: '-50%',
        duration: 0.3,
      },
      '<0.6',
    );
    tl.set(element.querySelector('.work-item-mask'), {
      opacity: 0,
    });
    tl.set(element, {
      pointerEvents: 'auto',
    });
  }, [width > 768, index]);
};

interface Props {
  index: number;
  work: WorkProps;
  id: string;
}

const WorkItem: React.FC<Props> = ({ index, work, id }) => {
  const ref = useRef<HTMLLIElement>(null);
  useAnimateOnScrollIn(ref, index);
  const { isPersonal, name, description, preview, techs } = work;

  return (
    <li ref={ref} className="work-item">
      <Link to={`work/${id}`} className="work-item-content">
        <span className="work-tag">
          {isPersonal ? 'Personal Work' : 'Company Work'}
        </span>
        <div className="work-item-title">
          <h3 className="heading">{name}</h3>
          <p>{description}</p>
        </div>
        <div
          className={cx('work-preview', {
            'is-mobile': preview.type === 'mobile',
          })}
        >
          <ImageWrap preview={preview as any} noAnimation lazyload />
        </div>
        <ul>
          {techs.map((tech) => (
            <li key={tech}>
              <Suspense fallback={<span />}>
                <TechIcon name={tech} />
              </Suspense>
            </li>
          ))}
        </ul>
        <div className="work-item-mask" aria-hidden />
      </Link>
    </li>
  );
};

const areEquals = (prevProps: Props, nextProps: Props) =>
  prevProps.id === nextProps.id;

export default memo(WorkItem, areEquals);
