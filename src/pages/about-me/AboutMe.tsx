import { useEffect, useCallback, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { gsap } from 'gsap';

import './AboutMe.scss';
import About from './components/About';
import Skills from './components/Skills';
import { onToggleAboutModal, selectIsAboutModalOpen } from '../../store/store';
import useSize from '../../hooks/useSize';

Modal.setAppElement('body');

const AboutMe: React.FC<{}> = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [width] = useSize();
  const isAboutModalOpen = useSelector(selectIsAboutModalOpen);
  const [aboutAnimationDone, setAboutAnimationDone] = useState(false);

  const closeContactModal = useCallback(
    () => dispatch(onToggleAboutModal(false)),
    [dispatch],
  );

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
        closeContactModal={closeContactModal}
        setAboutAnimationDone={setAboutAnimationDone}
      />
      <Skills
        closeContactModal={closeContactModal}
        aboutAnimationDone={aboutAnimationDone}
      />
    </Modal>
  );
};

export default AboutMe;
