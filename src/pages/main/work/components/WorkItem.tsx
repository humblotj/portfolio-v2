import {
  Suspense, useEffect, useRef, memo,
} from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import cx from 'classnames';
import 'lazysizes';

import './WorkItem.scss';
import { WorkProps } from '../../../../interface';
import { ReactComponent as ArrowRight } from '../../../../assets/icons/arrow-right.svg';
import ImageWrap from '../../../../components/ui/ImageWrap';
import useSize from '../../../../hooks/useSize';
import lazyWithRetry from '../../../../utils/lazyWithRetry';

const TechIcon = lazyWithRetry(() => import('../../../../components/ui/TechIcon'));

interface Props {
  index: number,
  work: WorkProps,
  id: string
}

const WorkItem = ({ index, work, id }: Props) => {
  const ref = useRef<HTMLLIElement>(null);
  const {
    isPersonal, name, description, preview, techs,
  } = work;
  const [width] = useSize();

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return () => {};
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: '35% bottom',
      },
    });
    const isLargeWidth = width > 768;
    const isOdd = index % 2 === 1;
    tl.addLabel('start', !isLargeWidth || !isOdd ? 0 : 0.25);
    tl.to(element.querySelector('.work-item-mask'),
      {
        x: '100%',
        // transformOrigin: '100% 50%',
        duration: 1,
      }, 'start');
    tl.to(
      element.querySelectorAll('.work-item-title > * > .reveal-text'),
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
      }, '<0.1',
    );
    tl.fromTo(element.querySelector('.work-preview'),
      {
        opacity: 0,
        x: '-25%',
        y: '-50%',
      },
      {
        opacity: 1,
        x: '-50%',
        y: '-50%',
        duration: 0.5,
      }, '<0.6');

    return () => tl.kill();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width > 768]);

  return (
    <li ref={ref} className="work-item">
      <Link
        to={`work/${id}`}
      >
        <div className="work-item-content">
          <span className="work-tag">{isPersonal ? 'Personal Work' : 'Company Work'}</span>
          <div className="work-item-title">
            <div className="reveal no-mask">
              <h3 className="reveal-text">{name}</h3>
            </div>
            <div className="reveal no-mask">
              <p className="reveal-text">
                {description}
              </p>
            </div>
          </div>
          <div className={cx('work-preview', { 'is-mobile': preview.type === 'mobile' })}>
            <ImageWrap
              preview={preview as any}
              noAnimation
              lazyload
            />
          </div>
          <ul>
            {techs.map((tech) => (
              <li key={tech.name}>
                <Suspense fallback={<span />}>
                  <TechIcon name={tech.name} />
                </Suspense>
              </li>
            ))}
          </ul>
          <div className="work-item-mask" aria-hidden />
        </div>
        <div className="learn-more">
          <p>Learn more</p>
          <ArrowRight />
        </div>
      </Link>
    </li>
  );
};

const areEquals = (
  prevProps: Props, nextProps: Props,
) => prevProps.id === nextProps.id;

export default memo(WorkItem, areEquals);
