import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import TagList from '../../../components/ui/TagList';
import './WorkDetailDescription.scss';
import TextBounce from '../../../components/ui/TextBounce';
import { WorkDetailProps } from '../../../interface';
import Laptop from '../../../components/ui/Laptop';
import Phone from '../../../components/ui/Phone';
import WorkDetailParallax from './WorkDetailParallax';

interface Props {
  work: WorkDetailProps
}

const WorkDetailDescription = ({ work }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !work) {
      return;
    }

    setTimeout(() => {
      const reveal = element.querySelectorAll('.reveal:not(.no-mask)');

      for (let i = 0; i < reveal.length; i++) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: reveal[i].querySelector('.reveal-mask') as any,
          },
        });
        tl.to(
          reveal[i].querySelector('.reveal-mask'),
          {
            scaleX: 1,
            duration: 0.8 + i * 0.1,
          },
        );
        tl.add('reveal');
        tl.to(
          reveal[i].querySelector('.reveal-mask'),
          {
            scaleX: 0,
            transformOrigin: '100% 50%',
            duration: 0.5,
            delay: 0.2,
          },
          'reveal',
        );
        tl.to(
          reveal[i].querySelector('.reveal-text'),
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.2,
          },
          'reveal',
        );
      }

      const revealNoMask = element.querySelectorAll('.reveal.no-mask');
      for (let i = 0; i < revealNoMask.length; i++) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: revealNoMask[i].querySelector('.reveal-text') as any,
          },
        });
        tl.to(
          revealNoMask[i].querySelector('.reveal-text'),
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1.2,
          },
        );
      }
    }, 100);
  }, [work]);

  if (!work) {
    return null;
  }

  const {
    name, description, year, techs,
  } = work;

  return (
    <div ref={ref} className="work-detail-description">
      <div>
        <div className="reveal desc-heading secondary">
          <h3 className="reveal-text">Project</h3>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <div className="reveal desc-heading">
          <h2 className="reveal-text">
            <TextBounce text={name} />
          </h2>
          <div className="reveal-mask" aria-hidden />
        </div>
      </div>
      <WorkDetailParallax preview={work.mainPreview} />
      <div>
        <div className="reveal desc-heading secondary">
          <h3 className="reveal-text">About</h3>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <div className="reveal no-mask">
          <p className="reveal-text">
            {description}
          </p>
        </div>
      </div>
      <div>
        <div className="reveal desc-heading secondary">
          <h3 className="reveal-text">Year</h3>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <div className="reveal no-mask">
          <p className="reveal-text">{year}</p>
        </div>
      </div>
      <div>
        <div className="reveal desc-heading secondary">
          <h3 className="reveal-text">Technologies</h3>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <div className="desc-heading reveal no-mask">
          <div className="reveal-text">
            <TagList tags={techs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetailDescription;
