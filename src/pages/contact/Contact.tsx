import {
  FormEvent, forwardRef, useEffect, useRef,
} from 'react';
import { gsap } from 'gsap';
import emailjs from 'emailjs-com';

import './Contact.scss';
import Button from '../../components/ui/Button';
import TextField from '../../components/ui/TextField';
import { ReactComponent as ContactMask } from '../../assets/contact-mask.svg';
import useCombinedRefs from '../../hooks/useCombinedRefs';

const Contact = forwardRef<HTMLElement>((props, ref) => {
  const innerRef = useCombinedRefs(ref) as any;
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const element = innerRef.current as unknown as HTMLElement;
    if (!element) {
      return;
    }

    const animate = (element: HTMLElement) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: innerRef.current,
          start: 'top 70%',
        },
      });
      tl.addLabel('start');
      tl.fromTo(element.querySelector('form'),
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1.05,
          duration: 0.6,
          delay: 0.5,
        });
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
      tl.fromTo(element.querySelector('h2'),
        {
          opacity: 0,
          x: '-300px',
        },
        {
          opacity: 1,
          x: '0',
          duration: 0.75,
        }, 'start');
      tl.fromTo(element.querySelector('.divider'),
        {
          opacity: 0,
          x: '300px',
        },
        {
          opacity: 1,
          x: '0',
          duration: 0.75,
          delay: 0.25,
        }, 'start');
      tl.fromTo(element.querySelector('.send-message > p'),
        {
          opacity: 0,
          x: '300px',
        },
        {
          opacity: 1,
          x: '0',
          duration: 0.75,
          delay: 0.5,
        }, 'start');
    };

    setTimeout(() => animate(element), 100);
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
