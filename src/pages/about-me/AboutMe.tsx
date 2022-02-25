import './AboutMe.scss';

import { gsap } from 'gsap';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import useSize from 'hooks/useSize';
import { onToggleAboutModal, selectIsAboutModalOpen } from 'store/store';
import About from './components/About';
import Skills from './components/Skills';

Modal.setAppElement('body');

const useAnimationOnInit = (contentRef: HTMLDivElement | null) => {
  const [width] = useSize();

  useEffect(() => {
    if (!contentRef) {
      return;
    }

    const tl = gsap.timeline({
      defaults: {
        ease: 'power1.in',
        duration: 0.5,
      },
    });

    if (width > 768) {
      tl.from(
        contentRef.querySelector('.about'),
        { y: '-100%', opacity: 0 },
        0,
      );
      tl.from(
        contentRef.querySelector('.skills'),
        { y: '100%', opacity: 0 },
        0.2,
      );
    } else {
      tl.from(contentRef.querySelectorAll('.about, .skills'), {
        x: '-100%',
        opacity: 0,
      });
    }
  }, [contentRef, width]);
};

const AboutMe: React.FC<{}> = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [width] = useSize();
  const isAboutModalOpen = useSelector(selectIsAboutModalOpen);
  const [aboutAnimationDone, setAboutAnimationDone] = useState(false);
  useAnimationOnInit(contentRef);

  const onClose = useCallback(() => {
    if (!contentRef) {
      return;
    }

    const tl = gsap.timeline({
      defaults: {
        ease: 'power1.in',
        duration: 0.3,
      },
    });

    if (width > 768) {
      tl.to(contentRef.querySelector('.about'), { y: '-100%', opacity: 0 }, 0);
      tl.to(contentRef.querySelector('.skills'), { y: '100%', opacity: 0 }, 0);
    }
    tl.call(() => {
      dispatch(onToggleAboutModal(false));
    });
  }, [dispatch, contentRef, width]);

  return (
    <Modal
      overlayClassName="modal-overlay"
      className="modal-content"
      isOpen={isAboutModalOpen}
      contentRef={(node) => {
        setContentRef(node);
      }}
    >
      <About
        closeContactModal={onClose}
        setAboutAnimationDone={setAboutAnimationDone}
      />
      <Skills
        closeContactModal={onClose}
        aboutAnimationDone={aboutAnimationDone}
      />
    </Modal>
  );
};

export default AboutMe;
