import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import './WorkItem.scss';
import { ReactComponent as ArrowRight } from '../../../assets/icons/arrow-right.svg';
import ImageWrap from '../../../components/ui/ImageWrap';
import { WorkProps } from '../../../interface';
import TechIcon from '../../../components/ui/TechIcon';
import useSize from '../../../hooks/useSize';

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
    // eslint-disable-next-line no-nested-ternary
    tl.addLabel('start', isLargeWidth ? isOdd ? 0.25 : 0 : 0);
    tl.to(element.querySelector('.work-item-mask'),
      {
        scaleX: 0,
        transformOrigin: '100% 50%',
        duration: 1,
      }, 'start');
    tl.to(element.querySelectorAll('.work-item-title > *'),
      {
        opacity: 1,
        y: 0,
        duration: 1,
      }, 'start');
    tl.fromTo(element.querySelector('.work-preview'),
      {
        opacity: 0,
        x: '50%',
        y: '-50%',
      },
      {
        opacity: 1,
        x: '-50%',
        y: '-50%',
        duration: 1,
      }, 'start');
    tl.set(element, { pointerEvents: 'auto' });

    return () => tl.kill();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width > 768]);

  return (
    <li ref={ref} className="work-item">
      {/* <span className="counter">{(`${index + 1}`).padStart(2, '0')}</span> */}
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
          <div className={cx('work-preview', { 'is-mobile': preview.type === 'mobile' })}>
            <ImageWrap
              preview={preview as any}
              startAnimation
              noAnimation
            />
          </div>
          <ul>
            {techs.map((tech) => (
              <li key={tech.name}>
                <TechIcon name={tech.name} />
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

export default WorkItem;
