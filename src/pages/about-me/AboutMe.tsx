import { useEffect, useState } from 'react';
import { gsap, Power1 } from 'gsap';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import './AboutMe.scss';
import About from './components/About';
import Skills from './components/Skills';
import { onToggleAboutModal, selectIsAboutModalOpen } from '../../store/store';

Modal.setAppElement('body');

const AboutMe = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement|null>(null);
  const dispatch = useDispatch();
  const isAboutModalOpen = useSelector(selectIsAboutModalOpen);

  const closeContactModal = () => dispatch(onToggleAboutModal(false));

  useEffect(() => {
    if (!contentRef) {
      return;
    }

    const tl = gsap.timeline();

    if (window.innerWidth > 768) {
      tl.fromTo(contentRef.querySelector('.about'),
        {
          y: '-100%',
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: Power1.easeIn,
        }, 0);
      tl.fromTo(contentRef.querySelector('.skills'),
        {
          y: '100%',
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          ease: Power1.easeIn,
        }, 0);
    } else {
      tl.fromTo([contentRef.querySelector('.about'), contentRef.querySelector('.skills')],
        {
          x: '-100%',
          opacity: 0,
        },
        {
          y: '0',
          opacity: 1,
          duration: 0.5,
          ease: Power1.easeIn,
        });
    }
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
