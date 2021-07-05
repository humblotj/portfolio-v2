import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import throttle from 'lodash.throttle';

import './AboutMe.scss';
import About from './components/About';
import Skills from './components/Skills';
import { onToggleAboutModal, selectIsAboutModalOpen } from '../../store/store';
import useAnimation from '../../hooks/useAnimation';
import useSize from '../../hooks/useSize';

Modal.setAppElement('body');

const AboutMe = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement|null>(null);
  const dispatch = useDispatch();
  const [width] = useSize();
  const { gsap } = useAnimation();
  const isAboutModalOpen = useSelector(selectIsAboutModalOpen);

  const closeContactModal = () => dispatch(onToggleAboutModal(false));

  useEffect(() => {
    if (!contentRef) {
      return;
    }

    const startAnimation = throttle(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power1.in',
          duration: 0.5,
        },
      });

      if (width > 768) {
        tl.fromTo(contentRef.querySelector('.about'),
          { y: '-100%', opacity: 0 }, { y: 0, opacity: 1 }, 0);
        tl.fromTo(contentRef.querySelector('.skills'),
          { y: '100%', opacity: 0 }, { y: 0, opacity: 1 }, 0.2);
      } else {
        tl.fromTo([contentRef.querySelector('.about'), contentRef.querySelector('.skills')],
          { x: '-100%', opacity: 0 }, { x: 0, opacity: 1 });
      }
    }, 100);

    startAnimation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef, width]);

  return (
    <>
      {isAboutModalOpen && (
      <Modal
        overlayClassName="modal-overlay"
        className="modal-content"
        isOpen={isAboutModalOpen}
        contentRef={(node) => { setContentRef(node); }}
      >
        <About closeContactModal={closeContactModal} />
        <Skills closeContactModal={closeContactModal} />
      </Modal>
      )}
    </>
  );
};

export default AboutMe;
