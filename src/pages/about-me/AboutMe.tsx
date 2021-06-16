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
      tl.addLabel('start');
      tl.fromTo(contentRef.querySelector('.about'),
        {
          y: '-100%',
          opacity: 0,
        },
        {
          y: '0',
          opacity: 1,
          duration: 0.5,
          ease: Power1.easeIn,
        }, 'start');
      tl.fromTo(contentRef.querySelector('.skills'),
        {
          y: '100%',
          opacity: 0,
        },
        {
          y: '0',
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          ease: Power1.easeIn,
        }, 'start');
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

    const aboutReveal = contentRef.querySelectorAll('.about .reveal');
    for (let i = 0; i < aboutReveal.length; i++) {
      const tl = gsap.timeline();
      tl.to(
        aboutReveal[i].querySelector('.reveal-mask'),
        {
          scaleX: 1,
          duration: 0.8,
          delay: 0.7,
          ease: 'power3.inOut',
        },
      );
      tl.add('reveal');
      tl.to(
        aboutReveal[i].querySelector('.reveal-mask'),
        {
          scaleX: 0,
          transformOrigin: '100% 50%',
          duration: 0.6,
          delay: 0.1 + i * 0.25,
          ease: 'power3.inOut',
        },
        'reveal',
      );
      tl.to(
        [aboutReveal[i].querySelector('.reveal-text'),
          i === 1 ? contentRef.querySelector('.about-description') : undefined],
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.4 + i * 0.25,
          ease: 'power4.out',
        },
        'reveal',
      );
    }

    tl.add('reveal');
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
