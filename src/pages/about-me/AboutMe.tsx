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
      tl.fromTo(
        aboutReveal[i].querySelector('.reveal-mask'),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8 + i * 0.25,
          delay: 0.7,
        },
      );
      tl.add('reveal');
      tl.to(
        aboutReveal[i].querySelector('.reveal-mask'),
        {
          scaleX: 0,
          transformOrigin: '100% 50%',
          duration: 0.5,
          delay: 0.2,
        },
        'reveal',
      );
      tl.to(
        aboutReveal[i].querySelector('.reveal-text'),
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.2,
        },
        'reveal',
      );
    }

    tl.add('reveal');
    tl.fromTo(
      contentRef.querySelector('.about-description'),
      {
        opacity: 0,
        y: '50%',
      },
      {
        opacity: 1,
        duration: 0.5,
        delay: 0.7 + 0.25 * 2,
        y: '0',
      },
      'reveal',
    );
    tl.from(
      contentRef.querySelector('h2'),
      {
        opacity: 0,
        duration: 0.5,
        delay: 0.7 + 0.25 * 2,
      },
      'reveal',
    );
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
