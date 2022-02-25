import './WorkDetailDescription.scss';

import { useEffect, useRef } from 'react';

import RevealText from 'components/molecules/RevealText';
import TagList from 'components/molecules/TagList';
import TextBounce from 'components/molecules/TextBounce';
import useAnimation from 'hooks/useAnimation';
import { WorkDetailProps } from 'interface';
import WorkDetailParallax from './WorkDetailParallax';

const useAnimateOnInit = (ref: React.RefObject<HTMLDivElement>) => {
  const { revealText } = useAnimation();

  useEffect((): void => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const animateWorkLinks = (tl: gsap.core.Timeline) =>
      tl.to(
        document.querySelector('.work-links'),
        {
          opacity: 1,
          ease: 'power.out3',
          duration: 0.3,
        },
        '<0.3',
      );

    const startAnimation = () => {
      const descParts = element.querySelectorAll('.desc-part');

      for (let j = 0; j < descParts.length; j++) {
        const reveal = descParts[j].querySelectorAll('.reveal');

        for (let i = 0; i < reveal.length; i++) {
          const tl = revealText(reveal[i], {
            delay: j * 0.2,
          });

          if (j === descParts.length - 1) {
            animateWorkLinks(tl);
          }
        }
      }
    };

    startAnimation();
  }, []);
};

interface Props {
  work: WorkDetailProps;
}

const WorkDetailDescription = ({ work }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useAnimateOnInit(ref);

  if (!work) {
    return null;
  }

  const { name, description, year, techs } = work;

  return (
    <div ref={ref} className="work-detail-description">
      <div className="desc-part">
        <RevealText className="desc-heading" color="secondary">
          <h3>Project</h3>
        </RevealText>
        <br />
        <RevealText>
          <h2>
            <TextBounce text={name} />
          </h2>
        </RevealText>
      </div>
      <WorkDetailParallax preview={work.mainPreview} />
      <div className="desc-part">
        <RevealText className="desc-heading" color="secondary">
          <h3>About</h3>
        </RevealText>
        <br />
        <RevealText noMask>
          <p>{description}</p>
        </RevealText>
      </div>
      <div className="desc-part">
        <RevealText className="desc-heading" color="secondary">
          <h3>Year</h3>
        </RevealText>
        <br />
        <RevealText noMask>
          <p>{year}</p>
        </RevealText>
      </div>
      <div className="desc-part">
        <RevealText className="desc-heading" color="secondary">
          <h3>Technologies</h3>
        </RevealText>
        <br />
        <RevealText noMask>
          <div>
            <TagList tags={techs} />
          </div>
        </RevealText>
      </div>
    </div>
  );
};

export default WorkDetailDescription;
