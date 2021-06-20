import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import './About.scss';
import photo from '../../../assets/photo.jpg';
import { ReactComponent as LocationIcon } from '../../../assets/icons/location.svg';
import CloseButton from '../../../components/ui/CloseButton';

const About = ({ closeContactModal }: {closeContactModal: ()=> void}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const reveal = element.querySelectorAll('.reveal');

    for (let i = 0; i < reveal.length; i++) {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.inOut',
        },
      });
      tl.to(
        reveal[i].querySelector('.reveal-mask'),
        {
          scaleX: 1,
          duration: 0.6,
          delay: i * 0.12,
        },
        '+=0.7',
      );
      tl.to(
        reveal[i].querySelector('.reveal-mask'),
        {
          scaleX: 0,
          transformOrigin: '100% 50%',
          duration: 0.4,
        },
        '+=0.4',
      );
      tl.to(
        [reveal[i].querySelector('.reveal-text'),
          i === 1 ? element.querySelector('.about-description') : undefined],
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
        },
        '<0.15',
      );
    }
  }, []);

  return (
    <div ref={ref} className="about">
      <CloseButton onClick={closeContactModal} />
      <h2>About</h2>
      <div className="about-info">
        <div className="pic reveal">
          <div className="pic-crop">
            <img className="reveal-text" src={photo} alt="profile-pic" width="150" height="150" />
          </div>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <div className="about-title reveal secondary">
          <h3 className="reveal-text">About me</h3>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <p className="about-description">
          Hi! I&apos;m Jean, a
          French software developer
          based in Seoul.
          <br />
          I specialize in front-end development – building
          {' '}
          <strong>
            efficient, interactive,
            modern, performant
          </strong>
          , and
          {' '}
          <strong>scalable</strong>
          {' '}
          projects –
          but also like experimenting with new backend technologies.
          <br />
          I am open to
          {' '}
          <strong>new technologies</strong>
          {' '}
          and
          {' '}
          <strong>development opportunities</strong>
          .
        </p>
      </div>
      <div className="about-footer">
        <div className="reveal secondary">
          <p className="reveal-text">
            <LocationIcon />
            &nbsp;
            Seoul, South Korea
          </p>
          <div className="reveal-mask" aria-hidden />
        </div>
      </div>
    </div>
  );
};

export default About;
