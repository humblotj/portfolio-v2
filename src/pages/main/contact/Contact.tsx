import { FormEvent, forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { sendForm } from 'emailjs-com';
import mergeRefs from 'react-merge-refs';

import './Contact.scss';
import Button from '../../../components/atoms/Button';
import TextField from '../../../components/atoms/TextField';
import Strokes from '../../../components/molecules/Strokes';
import { ReactComponent as ContactMask } from '../../../assets/contact-mask.svg';

const Contact = forwardRef<HTMLElement>((props, ref) => {
  const innerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const element = innerRef.current!;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: innerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reset',
      },
      defaults: {
        duration: 0.75,
      },
    });
    tl.to(
      element.querySelector('form'),
      {
        opacity: 1,
        scale: 1.05,
        duration: 0.6,
      },
      0.5,
    );
    tl.to(element.querySelector('form'), {
      opacity: 1,
      scale: 0.95,
      duration: 0.2,
    });
    tl.to(element.querySelector('form'), {
      opacity: 1,
      scale: 1,
      duration: 0.2,
    });

    tl.from(element.querySelector('h2'), { opacity: 0, x: '-300px' }, 0);
    tl.from(
      element.querySelector('.divider'),
      { opacity: 0, x: '300px' },
      0.25,
    );
    tl.from(
      element.querySelector('.send-message > p'),
      { opacity: 0, x: '300px' },
      0.5,
    );
  }, []);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendForm(
      process.env.REACT_APP_SERVICE_ID || '',
      process.env.REACT_APP_TEMPLATE_ID || '',
      e.target as any,
      process.env.REACT_APP_USER_ID || '',
    ).then(
      () => {
        formRef.current?.reset();
        alert('Email Sent');
      },
      (error: { text: string }) => {
        alert(error.text);
      },
    );
  };

  return (
    <section ref={mergeRefs([innerRef, ref])} className="contact-sec">
      <ContactMask />
      <Strokes />
      <div className="contact-inner">
        <h2 className="heading">Contact</h2>
        <div className="divider" aria-hidden />
        <div className="send-message">
          <p>Have a question or want to work together?</p>
          <form onSubmit={sendEmail} ref={formRef}>
            <TextField label="Name" name="fromName" />
            <TextField label="E-mail" name="fromEmail" />
            <TextField label="Message" textarea name="message" />
            <div className="submit-wrap">
              <Button type="submit" color="red">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});

export default Contact;
