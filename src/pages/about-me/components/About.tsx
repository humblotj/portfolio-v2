import './About.scss';

import { memo, useEffect, useRef } from 'react';

import { ReactComponent as LocationIcon } from 'assets/icons/location.svg';
import photo from 'assets/photo.jpg';
import CloseButton from 'components/atoms/CloseButton';
import useAnimation from 'hooks/useAnimation';

const useAnimateOnInit = (
  ref: React.RefObject<HTMLDivElement>,
  onAnimationDone: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { revealText } = useAnimation();

  useEffect(() => {
    const element = ref.current!;
    const reveal = element.querySelectorAll('.reveal');

    for (let i = 0; i < reveal.length; i++) {
      const tl = revealText(reveal[i], {
        delay: 0.7 + i * 0.2,
      });
      if (i === reveal.length - 1) {
        tl.call(() => onAnimationDone(true), undefined, '<');
      }
    }
  }, []);
};

interface Props {
  closeContactModal: () => void;
  setAboutAnimationDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const About: React.FC<Props> = ({
  closeContactModal,
  setAboutAnimationDone,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useAnimateOnInit(ref, setAboutAnimationDone);

  return (
    <div ref={ref} className="about" data-testid="about">
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
        <div className="about-description reveal">
          <p className="reveal-text">
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
