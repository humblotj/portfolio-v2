import { useEffect, useRef, memo } from 'react';

import './About.scss';
import photo from '../../../assets/photo.jpg';
import { ReactComponent as LocationIcon } from '../../../assets/icons/location.svg';
import CloseButton from '../../../components/atoms/CloseButton';
import useAnimation from '../../../hooks/useAnimation';

interface Props {
  closeContactModal: () => void;
}

const About: React.FC<Props> = ({ closeContactModal }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animateReveal } = useAnimation();

  useEffect(() => {
    const element = ref.current!;
    const reveal = element.querySelectorAll('.reveal');

    for (let i = 0; i < reveal.length; i++) {
      const tl = animateReveal(reveal[i], {
        delay: 0.7 + (i > 1 ? i + 1 : i) * 0.12,
      });

      if (i === 1) {
        tl.to(
          element.querySelector('.about-description > p'),
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power4.out',
          },
          '<0.12',
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className="about">
      <CloseButton onClick={closeContactModal} />
      <h2>About</h2>
      <div className="about-info">
        <div className="pic reveal">
          <div className="pic-crop">
            <img
              className="reveal-text"
              src={photo}
              alt="profile-pic"
              width="150"
              height="150"
            />
          </div>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <div className="about-title reveal secondary">
          <h3 className="reveal-text">About me</h3>
          <div className="reveal-mask" aria-hidden />
        </div>
        <br />
        <div className="about-description">
          <p>
            Hi! I&apos;m Jean, a French software developer based in Seoul.
            <br />I specialize in front-end development – building{' '}
            <strong>efficient, interactive, modern, performant</strong>, and{' '}
            <strong>scalable</strong> projects – but also like experimenting
            with backend technologies.
            <br />I am open to <strong>new technologies</strong> and{' '}
            <strong>development opportunities</strong>.
          </p>
        </div>
      </div>
      <div className="about-footer">
        <div className="reveal secondary">
          <p className="reveal-text">
            <LocationIcon />
            &nbsp; Seoul, South Korea
          </p>
          <div className="reveal-mask" aria-hidden />
        </div>
      </div>
    </div>
  );
};

export default memo(About);
