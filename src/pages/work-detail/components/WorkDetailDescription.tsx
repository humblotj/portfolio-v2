import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import TagList from '../../../components/ui/TagList';
import './WorkDetailDescription.scss';
import TextBounce from '../../../components/ui/TextBounce';
import { WorkDetailProps } from '../../../interface';
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
      const descParts = element.querySelectorAll('.desc-part');

      for (let j = 0; j < descParts.length; j++) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: descParts[j].querySelector('.reveal:not(.desc-heading)') as any,
          },
        });

        const reveal = descParts[j].querySelectorAll('.reveal:not(.no-mask)');
        tl.addLabel('start');
        for (let i = 0; i < reveal.length; i++) {
          tl.to(
            reveal[i].querySelector('.reveal-mask'),
            {
              scaleX: 1,
              duration: 0.8 + i * 0.1,
            },
            'start',
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

        const revealNoMask = descParts[j].querySelectorAll('.reveal.no-mask');
        for (let i = 0; i < revealNoMask.length; i++) {
          tl.to(
            revealNoMask[i].querySelector('.reveal-text'),
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 1.2,
            },
            'start',
          );

          if (i === revealNoMask.length - 1 && j === descParts.length - 1) {
            tl.to(document.querySelector('.work-links'), {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 1.2,
            },
            'start');
          }
        }
      }
    }, 100);
  }, [work]);

  if (!work) {
    return null;
  }

  const {
    name, primaryColor, description, year, techs,
  } = work;

  return (
    <div ref={ref} className="work-detail-description">
      <div className="desc-part">
        <div className="reveal desc-heading secondary">
          <h3
            className="reveal-text"
          >
            Project
          </h3>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <div className="reveal">
          <h2 className="reveal-text">
            <TextBounce text={name} />
          </h2>
          <div className="reveal-mask" aria-hidden />
        </div>
      </div>
      <WorkDetailParallax preview={work.mainPreview} />
      <div className="desc-part">
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
      <div className="desc-part">
        <div className="reveal desc-heading secondary">
          <h3 className="reveal-text">Year</h3>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <div className="reveal no-mask">
          <p className="reveal-text">{year}</p>
        </div>
      </div>
      <div className="desc-part">
        <div className="reveal desc-heading secondary">
          <h3 className="reveal-text">Technologies</h3>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <div className="reveal no-mask">
          <div className="reveal-text">
            <TagList tags={techs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetailDescription;
