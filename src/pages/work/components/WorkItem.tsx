import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import cx from 'classnames';

import './WorkItem.scss';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow.svg';
import ImageWrap from '../../../components/ui/ImageWrap';

interface Props {
  index: number
}

const WorkItem = ({ index }: Props) => {
  const ref = useRef<HTMLLIElement>(null);
  const location = useLocation();

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
      },
    });
    tl.addLabel('start');
    tl.to(element.querySelector('.work-item-mask'),
      {
        scaleX: 0,
        transformOrigin: '100% 50%',
        duration: 1,
      }, 'start');
    tl.to(element.querySelector('.work-item-title'),
      {
        opacity: 1,
        y: 0,
        duration: 1,
      }, 'start');
    tl.fromTo(element.querySelector('.work-preview'),
      {
        opacity: 0,
        x: '0%',
        y: '-50%',
      },
      {
        opacity: 1,
        x: '-50%',
        y: '-50%',
        duration: 1,
      }, 'start');
  }, []);

  return (
    <li ref={ref} className="work-item">
      <span className="counter">{(`${index + 1}`).padStart(2, '0')}</span>
      <Link
        to={`work/${index}`}
      >
        <div className="work-item-content">
          <h4>Personal Work</h4>
          <div className="work-item-title">
            <h3>Jean Trello</h3>
            <p>Angular</p>
          </div>
          <div className={cx('work-preview', { 'is-mobile': index === 1 })}>
            <ImageWrap isMobile={index === 1} />
          </div>
          <ArrowIcon className="arrow-icon" />
          <p>See more</p>
        </div>
        <div className="work-item-mask" aria-hidden />
      </Link>
    </li>
  );
};

export default WorkItem;
