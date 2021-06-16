import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import TagList from '../../../components/ui/TagList';
import './WorkDetailDescription.scss';
import TextBounce from '../../../components/ui/TextBounce';
import { WorkDetailProps } from '../../../interface';
import WorkDetailParallax from './WorkDetailParallax';

interface Props {
  work: WorkDetailProps,
  setCanStartCarAnimation: (b: boolean) => void
}

const WorkDetailDescription = ({ work, setCanStartCarAnimation }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    const element = ref.current;
    if (!element || !work) {
      return null;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const descParts = element.querySelectorAll('.desc-part');

    for (let j = 0; j < descParts.length; j++) {
      const reveal = descParts[j].querySelectorAll('.reveal:not(.no-mask)');
      for (let i = 0; i < reveal.length; i++) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: descParts[j],
          },
        });

        tl.addLabel('start');

        tl.to(
          reveal[i].querySelector('.reveal-mask'),
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.inOut',
          },
          'start',
        );
        tl.add('reveal');
        tl.to(
          reveal[i].querySelector('.reveal-mask'),
          {
            scaleX: 0,
            transformOrigin: '100% 50%',
            duration: 0.6,
            delay: 0.1 + j * 0.1 + i * 0.05,
            ease: 'power3.inOut',
          },
          'reveal',
        );
        tl.to(
          reveal[i].querySelector('.reveal-text'),
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.4 + j * 0.1 + i * 0.05,
            ease: 'power4.out',
          },
          'reveal',
        );
      }

      const revealNoMask = descParts[j].querySelectorAll('.reveal.no-mask');
      for (let i = 0; i < revealNoMask.length; i++) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: descParts[j],
          },
        });

        tl.addLabel('start');
        tl.to(
          revealNoMask[i].querySelector('.reveal-text'),
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 1.2 + j * 0.1 + i * 0.05,
            ease: 'power4.out',
          },
          'start',
        );

        if (i === revealNoMask.length - 1 && j === descParts.length - 1) {
          tl.to(document.querySelector('.work-links'), {
            opacity: 1,
            duration: 0.5,
            delay: 1.1 + j * 0.1 + i * 0.05,
            ease: 'power4.in',
            // eslint-disable-next-line no-loop-func
            onStart: () => { timeout = setTimeout(() => setCanStartCarAnimation(true), 500); },
          },
          'start');
        }
      }
    }

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
