import { useEffect } from 'react';
import { gsap } from 'gsap';
import { useParams } from 'react-router-dom';
import { FirestoreDocument } from '@react-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import './WorkDetail.scss';
import WorkDetailDescription from './components/WorkDetailDescription';
import WorkPreviewCarousel from './components/WorkPreviewCarousel';
import Button from '../../components/ui/Button';
import BackArrow from '../../components/ui/BackArrow';
import WorkDetailParallax from './components/WorkDetailParallax';
import { onInit, selectIsInit, selectWorkDetails } from '../../store/store';

const WorkDetail = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(selectIsInit);
  const work = useSelector(selectWorkDetails);

  useEffect(() => {
    if (!isInit) {
      dispatch(onInit());
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

  return (
    <section className="work-detail-sec">
      <BackArrow>
        Turn Back Home
      </BackArrow>
      <WorkDetailDescription work={work} />
      <WorkDetailParallax preview={work.mainPreview} />
      <div className="work-links">
        <Button>Visit Site</Button>
        <Button color="secondary">View Code</Button>
      </div>
      <WorkPreviewCarousel work={work} />
    </section>
  );
};

export default WorkDetail;
