import { forwardRef, useEffect } from 'react';
import { gsap } from 'gsap';

import './Contact.scss';
import Button from '../../components/ui/Button';
import TextField from '../../components/ui/TextField';
import { ReactComponent as ContactMask } from '../../assets/contact-mask.svg';
import useCombinedRefs from '../../hooks/useCombinedRefs';

const Contact = forwardRef<HTMLElement>((props, ref) => {
  const innerRef = useCombinedRefs(ref) as any;

  useEffect(() => {
    if (innerRef.current) {
      const element = innerRef.current as unknown as HTMLElement;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: innerRef.current,
          start: 'top 75%',
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
    }
  }, []);

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
          <form action="">
            <TextField label="Name" />
            <TextField label="E-mail" />
            <TextField label="Message" textarea />
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
