import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import './AboutMe.scss';
import About from './components/About';
import Skills from './components/Skills';
import { onToggleAboutModal, selectIsAboutModalOpen } from '../../store/store';
import useAnimation from '../../hooks/useAnimation';

Modal.setAppElement('body');

const AboutMe = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement|null>(null);
  const dispatch = useDispatch();
  const { gsap } = useAnimation();
  const isAboutModalOpen = useSelector(selectIsAboutModalOpen);

  const closeContactModal = () => dispatch(onToggleAboutModal(false));

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

    if (window.innerWidth > 768) {
      tl.from(contentRef.querySelector('.about'),
        { y: '-100%', opacity: 0 }, 0);
      tl.from(contentRef.querySelector('.skills'),
        { y: '100%', opacity: 0 }, 0.2);
    } else {
      tl.from([contentRef.querySelector('.about'), contentRef.querySelector('.skills')],
        { x: '-100%', opacity: 0 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef]);

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
