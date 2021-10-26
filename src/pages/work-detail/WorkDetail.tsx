import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './WorkDetail.scss';
import WorkDetailDescription from './components/WorkDetailDescription';
import WorkPreviewCarousel from './components/WorkPreviewCarousel';
import BackArrow from '../../components/atoms/BackArrow';
import Strokes from '../../components/molecules/Strokes';
import WorkDetailFooter from './components/WorkDetailFooter';
import { onInit, selectIsInit, selectWorkDetails } from '../../store/store';
import useAnimation from '../../hooks/useAnimation';
import WorkDetailLinks from './components/WorkDetailLinks';

const WorkDetail = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(selectIsInit);
  const work = useSelector(selectWorkDetails);
  const { skipBlink } = useAnimation();

  useEffect(() => {
    if (!isInit) {
      dispatch(onInit());
    }

    return skipBlink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!work) {
    return null;
  }

  return (
    <>
      <section className="work-detail-sec">
        <Strokes />
        <BackArrow>Turn Back Home</BackArrow>
        <WorkDetailDescription work={work} />
        <WorkDetailLinks work={work} />
        <WorkPreviewCarousel work={work} />
      </section>
      <WorkDetailFooter work={work} />
    </>
  );
};

export default WorkDetail;
