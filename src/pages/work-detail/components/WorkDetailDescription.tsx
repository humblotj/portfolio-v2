import { useEffect, useRef } from 'react';

import './WorkDetailDescription.scss';
import { WorkDetailProps } from '../../../interface';
import TagList from '../../../components/ui/TagList';
import TextBounce from '../../../components/ui/TextBounce';
import WorkDetailParallax from './WorkDetailParallax';
import useAnimation from '../../../hooks/useAnimation';

interface Props {
  work: WorkDetailProps,
}

const WorkDetailDescription = ({ work }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animateReveal } = useAnimation();

  useEffect((): any => {
    const element = ref.current;
    if (!element || !work) {
      return null;
    }

    const descParts = element.querySelectorAll('.desc-part');

    for (let j = 0; j < descParts.length; j++) {
      const reveal = descParts[j].querySelectorAll('.reveal');
      for (let i = 0; i < reveal.length; i++) {
        const tl = animateReveal(reveal[i], { delay: i * 0.12, trigger: descParts[j] });

        if (j === descParts.length - 1) {
          tl.to(document.querySelector('.work-links'), {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
          }, '<0.3');
        }
      }
    }

    return null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!work) {
    return null;
  }

  const {
    name, description, year, techs,
  } = work;

  return (
    <div ref={ref} className="work-detail-description">
      <div className="desc-part">
        <div className="reveal desc-heading secondary">
          <h3 className="reveal-text">
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
