import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import TagList from '../../../components/ui/TagList';
import './WorkDetailDescription.scss';
import TextBounce from '../../../components/ui/TextBounce';

const WorkDetailDescription = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const reveal = element.querySelectorAll('.reveal:not(.no-mask)');

    for (let i = 0; i < reveal.length; i++) {
      const tl = gsap.timeline();
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
      gsap.to(
        revealNoMask[i].querySelector('.reveal-text'),
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.2,
        },
      );
    }
  }, []);

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
            <TextBounce text="Jean Trello" />
          </h2>
          <div className="reveal-mask" aria-hidden />
        </div>
      </div>
      <div>
        <div className="reveal desc-heading secondary">
          <h3 className="reveal-text">About</h3>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <div className="reveal no-mask">
          <p className="reveal-text">
            ThinkW is web development company located in Calgary.
            The company specializes in building eCommerce websites, SEO and Social Networks.
            The design of the website should be clean but at the same time make usage of bright.
            The portfolio page should get special attention because that’s how they get most of.
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
          <p className="reveal-text">2020</p>
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
            <TagList tags={['React', 'Redux', 'Javascript']} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetailDescription;
