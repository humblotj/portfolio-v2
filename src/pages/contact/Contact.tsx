import {
  FormEvent, forwardRef, useEffect, useRef,
} from 'react';
import emailjs from 'emailjs-com';

import './Contact.scss';
import Button from '../../components/ui/Button';
import TextField from '../../components/ui/TextField';
import { ReactComponent as ContactMask } from '../../assets/contact-mask.svg';
import useCombinedRefs from '../../hooks/useCombinedRefs';
import Strokes from '../../components/Strokes';
import useAnimation from '../../hooks/useAnimation';

const Contact = forwardRef<HTMLElement>((props, ref) => {
  const innerRef = useCombinedRefs(ref) as any;
  const formRef = useRef<HTMLFormElement>(null);
  const { gsap } = useAnimation();

  useEffect(() => {
    const element = innerRef.current;
    if (!element) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: innerRef.current,
        start: 'top 70%',
      },
      defaults: {
        duration: 0.75,
      },
    });
    tl.fromTo(element.querySelector('form'),
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1.05,
        duration: 0.6,
      }, 0.5);
    tl.to(element.querySelector('form'),
      {
        opacity: 1,
        scale: 0.95,
        duration: 0.2,
      });
    tl.to(element.querySelector('form'),
      {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      });

    tl.from(element.querySelector('h2'),
      { opacity: 0, x: '-300px' }, 0);
    tl.from(element.querySelector('.divider'),
      { opacity: 0, x: '300px' }, 0.25);
    tl.from(element.querySelector('.send-message > p'),
      { opacity: 0, x: '300px' }, 0.5);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerRef]);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID || '',
      process.env.REACT_APP_TEMPLATE_ID || '', e.target as any, process.env.REACT_APP_USER_ID || '')
      .then(() => {
        formRef.current?.reset();
        alert('Email Sent');
      }, (error) => {
        alert(error.text);
      });
  };

  return (
    <section ref={innerRef} className="contact-sec">
      <ContactMask />
      <Strokes />
      <div className="contact-inner">
        <h2>Contact</h2>
        <div className="divider" aria-hidden />
        <div className="send-message">
          <p>
            Have a question or want to work together?
          </p>
          <form onSubmit={sendEmail} ref={formRef}>
            <TextField label="Name" name="fromName" />
            <TextField label="E-mail" name="fromEmail" />
            <TextField label="Message" textarea name="message" />
            <div className="submit-wrap">
              <Button type="submit" color="red">Send Message</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});

export default Contact;
