import { Suspense, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import cx from 'classnames';
import 'lazysizes';

import './WorkItem.scss';
import { WorkProps } from '../../../interface';
import { ReactComponent as ArrowRight } from '../../../assets/icons/arrow-right.svg';
import ImageWrap from '../../../components/ui/ImageWrap';
import useSize from '../../../hooks/useSize';
import lazyWithRetry from '../../../utils/lazyWithRetry';

const TechIcon = lazyWithRetry(() => import('../../../components/ui/TechIcon'));

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
    tl.from(element,
      {
        opacity: 0,
        y: 60,
        duration: 1,
      }, 'start');
    // tl.to(element.querySelectorAll('.work-item-title > *'),
    //   {
    //     opacity: 1,
    //     y: 0,
    //     duration: 1,
    //   }, 'start');
    // tl.fromTo(element.querySelector('.work-preview'),
    //   {
    //     opacity: 0,
    //     x: '50%',
    //     y: '-50%',
    //   },
    //   {
    //     opacity: 1,
    //     x: '-50%',
    //     y: '-50%',
    //     duration: 1,
    //   }, 'start');

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
            <h3>{name}</h3>
            <p>
              {description}
            </p>
          </div>
          {/* <div className={cx('work-preview', { 'is-mobile': preview.type === 'mobile' })}>
            <ImageWrap
              preview={preview as any}
              startAnimation
              noAnimation
              lazyload
            />
          </div> */}
          <ul>
            {/* {techs.map((tech) => (
              <li key={tech.name}>
                <Suspense fallback={<span />}>
                  <TechIcon name={tech.name} />
                </Suspense>
              </li>
            ))} */}
          </ul>
          {/* <div className="work-item-mask" aria-hidden /> */}
        </div>
        <div className="learn-more">
          <p>Learn more</p>
          <ArrowRight />
        </div>
      </Link>
    </li>
  );
};

export default WorkItem;
