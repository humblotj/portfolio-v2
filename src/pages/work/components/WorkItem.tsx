import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import './WorkItem.scss';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow.svg';
import ImageWrap from '../../../components/ui/ImageWrap';
import { WorkProps } from '../../../interface';

interface Props {
  index: number,
  work: WorkProps,
  id: string
}

const WorkItem = ({ index, work, id }: Props) => {
  const ref = useRef<HTMLLIElement>(null);
  const {
    isPersonal, name, preview, techs,
  } = work;

  const animate = (element: HTMLElement) => {
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
        x: '50%',
        y: '-50%',
      },
      {
        opacity: 1,
        x: '-50%',
        y: '-50%',
        duration: 1,
      }, 'start');
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    setTimeout(() => {
      animate(element);
    }, 100);
  }, []);

  return (
    <li ref={ref} className="work-item">
      <span className="counter">{(`${index + 1}`).padStart(2, '0')}</span>
      <Link
        to={`work/${id}`}
      >
        <div className="work-item-content">
          <h4>{isPersonal ? 'Personal Work' : 'Company Work'}</h4>
          <div className="work-item-title">
            <h3>{name}</h3>
            <p style={{ color: techs[0]?.color }}>
              {techs.map((tech, index) => (index !== 0 ? `, ${tech.name}` : tech.name))}
            </p>
          </div>
          <div className={cx('work-preview', { 'is-mobile': preview.type === 'mobile' })}>
            <ImageWrap src={preview.url} isMobile={preview.type === 'mobile'} />
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
