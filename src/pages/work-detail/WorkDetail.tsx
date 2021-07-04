import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useDispatch, useSelector } from 'react-redux';

import './WorkDetail.scss';
import WorkDetailDescription from './components/WorkDetailDescription';
import WorkPreviewCarousel from './components/WorkPreviewCarousel';
import Button from '../../components/ui/Button';
import BackArrow from '../../components/ui/BackArrow';
import Strokes from '../../components/Strokes';
import { onInit, selectIsInit, selectWorkDetails } from '../../store/store';

const types = {
  ios: 'Apple Store',
  android: 'Play Store',
  web: 'Visit site',
};

const WorkDetail = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(selectIsInit);
  const work = useSelector(selectWorkDetails);
  const [canStartCarAnimation, setCanStartCarAnimation] = useState(false);

  useEffect(() => {
    if (!isInit) {
      dispatch(onInit());
    }

    const blink = document.querySelectorAll('.blink');
    gsap.to(blink, { opacity: 1, duration: 0 });
    return () => {
      gsap.to(blink, { opacity: 0, duration: 0 });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!work) {
    return null;
  }

  const goTo = (url: string) => window.open(url, '_blank');

  return (
    <>
      <section className="work-detail-sec">
        <BackArrow>
          Turn Back Home
        </BackArrow>
        <Strokes />
        <WorkDetailDescription work={work} setCanStartCarAnimation={setCanStartCarAnimation} />
        <div className="work-links">
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
        <WorkPreviewCarousel work={work} canStartCarAnimation={canStartCarAnimation} />
      </section>
    </>
  );
};

export default WorkDetail;
