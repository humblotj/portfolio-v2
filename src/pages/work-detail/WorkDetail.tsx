import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useDispatch, useSelector } from 'react-redux';

import './WorkDetail.scss';
import WorkDetailDescription from './components/WorkDetailDescription';
import WorkPreviewCarousel from './components/WorkPreviewCarousel';
import Button from '../../components/ui/Button';
import BackArrow from '../../components/ui/BackArrow';
import { onInit, selectIsInit, selectWorkDetails } from '../../store/store';

const WorkDetail = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const isInit = useSelector(selectIsInit);
  const work = useSelector(selectWorkDetails);

  useEffect(() => {
    if (!isInit) {
      dispatch(onInit());
    }

    const element = ref.current;
    if (element) {
      setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
          },
        }); tl.to(element, {
          opacity: 1, y: 0, duration: 1, delay: 1.2,
        });
      }, 100);
    }

    const blink = document.querySelectorAll('.blink');
    gsap.to(blink, { opacity: 1, duration: 0 });

    return () => {
      gsap.to(blink, { opacity: 0, duration: 0 });
    };
  }, []);

  if (!work) {
    return null;
  }

  const goTo = (url: string) => {
    window.open(url, '_blank');
  };

  const types = {
    ios: 'Apple Store',
    android: 'Play Store',
    web: 'Visit site',
  };

  return (
    <section className="work-detail-sec">
      <BackArrow>
        Turn Back Home
      </BackArrow>
      <WorkDetailDescription work={work} />
      <div ref={ref} className="work-links">
        {work.links?.length ? work.links.map(({ type, url }) => (
          <Button key={url} onClick={() => goTo(url)}>{types[type]}</Button>
        ))
          : <Button disabled>Coming Soon</Button>}

        {work.repoUrl
        && (
        <Button
          color="secondary"
          onClick={() => goTo(work.repoUrl || '')}
        >
          View Code
        </Button>
        )}
      </div>
      <WorkPreviewCarousel work={work} />
    </section>
  );
};

export default WorkDetail;
