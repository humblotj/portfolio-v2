import { Suspense, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import cx from 'classnames';
import 'lazysizes';

import './WorkItem.scss';
import { WorkProps } from '../../../../interface';
import { ReactComponent as ArrowRight } from '../../../../assets/icons/arrow-right.svg';
import ImageWrap from '../../../../components/molecules/ImageWrap';
import useSize from '../../../../hooks/useSize';
import lazyWithRetry from '../../../../utils/lazyWithRetry';

const TechIcon = lazyWithRetry(
  () => import('../../../../components/atoms/TechIcon'),
);

interface Props {
  index: number;
  work: WorkProps;
  id: string;
}

const WorkItem: React.FC<Props> = ({ index, work, id }) => {
  const ref = useRef<HTMLLIElement>(null);
  const { isPersonal, name, description, preview, techs } = work;
  const [width] = useSize();

  useEffect(() => {
    const element = ref.current!;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: '35% bottom',
      },
    });
    const isLargeWidth = width > 768;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width > 768, index]);

  return (
    <li ref={ref} className="work-item">
      <Link to={`work/${id}`} className="work-item-content">
        <span className="work-tag">
          {isPersonal ? 'Personal Work' : 'Company Work'}
        </span>
        <div className="work-item-title">
          <h3>{name}</h3>
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
