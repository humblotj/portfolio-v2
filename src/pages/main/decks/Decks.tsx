/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useRef, forwardRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  collection,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite';
import cx from 'classnames';

import './Decks.scss';
import useSize from '../../../hooks/useSize';

const Decks = forwardRef<HTMLElement>((_, ref) => {
  const [width] = useSize();
  const decksTextRef = useRef<HTMLDivElement>(null);
  const decksWrapperRef = useRef<HTMLDivElement>(null);
  const [decks, setDecks] = useState<{ mobile: string[]; web: string[] }>({
    mobile: [],
    web: [],
  });

  const initAnimation = () => {
    const decksWrapperElement = decksWrapperRef.current!;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: decksWrapperElement,
        start: '0 bottom',
        end: `+=${decksWrapperElement.offsetHeight + window.innerHeight}`,
        scrub: true,
      },
      ease: 'linear',
    });

    const animateFromTo = (
      index: number,
      {
        start,
        end,
        duration,
      }: { start: number; end: number; duration: number },
    ) => {
      tl.fromTo(
        decksWrapperElement.querySelectorAll(
          `.decks-grid:nth-child(7n + ${index})`,
        ),
        { y: start },
        { y: end, duration, ease: 'linear' },
        0,
      );
    };

    animateFromTo(1, {
      start: 196,
      end: -117,
      duration: 0.8,
    });
    animateFromTo(2, {
      start: 317,
      end: -109,
      duration: 1,
    });
    animateFromTo(3, {
      start: 317,
      end: -109,
      duration: 0.8,
    });
    animateFromTo(4, {
      start: 230,
      end: -117,
      duration: 1,
    });
    animateFromTo(5, {
      start: 213,
      end: -152,
      duration: 0.8,
    });
    animateFromTo(6, {
      start: 196,
      end: -117,
      duration: 1,
    });
    animateFromTo(7, {
      start: 230,
      end: -178,
      duration: 0.8,
    });
  };

  const fetchDecks = async () => {
    const querySnapshot = await getDocs(collection(getFirestore(), 'decks-2'));
    const decks: any = {};
    querySnapshot.forEach((doc) => {
      decks[doc.id] = [
        ...(doc as QueryDocumentSnapshot<{ pictures: string[] }>).data()
          .pictures,
      ];
    });
    setDecks(decks);
  };

  const onInit = async () => {
    const decksTextElement = decksTextRef.current!;

    gsap.to(decksTextElement.querySelectorAll('p , h2'), {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.3,
      scrollTrigger: {
        trigger: decksTextElement,
        start: `${
          (decksTextElement.offsetHeight + window.innerHeight) * 0.1
        } bottom`,
      },
    });

    try {
      await fetchDecks();
      initAnimation();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <section className="decks-sec" ref={ref}>
      <div ref={decksTextRef} className="decks-text">
        <h2 className="heading">Explore my work</h2>
        <p>
          Take a look at a selection of my front-end and few back-end projects.
          I build them with great attention detail and high quality code.
        </p>
      </div>
      <div ref={decksWrapperRef} className="decks-wrapper">
        {[...Array(width > 479 ? 10 : 6).keys()].map((i) => (
          <div
            className={cx('decks-grid', { 'is-mobile': i % 2 === 0 })}
            key={i}
          >
            {[...Array(i % 2 === 0 ? 3 : 5).keys()].map((j) => (
              <img
                className={
                  i % 2 === 0
                    ? ((i * 3 + j) % decks.mobile.length) + ''
                    : ((i * 5 + j) % decks.web.length) + ''
                }
                key={j}
                src={
                  i % 2 === 0
                    ? decks.mobile[
                        ((Math.floor(i / 2) + 1) * 3 + j) % decks.mobile.length
                      ]
                    : decks.web[(Math.floor(i / 2) * 5 + j) % decks.web.length]
                }
                alt=""
                height="925"
                width="1600"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
});

export default Decks;
