import './WorkDetail.scss';

import { useSelector } from 'react-redux';

import BackArrow from 'components/atoms/BackArrow';
import Strokes from 'components/molecules/Strokes';
import useDispatchInit from 'hooks/useDispatchInit';
import { selectWorkDetails } from 'store/store';
import WorkDetailDescription from './components/WorkDetailDescription';
import WorkDetailFooter from './components/WorkDetailFooter';
import WorkDetailLinks from './components/WorkDetailLinks';
import WorkPreviewCarousel from './components/WorkPreviewCarousel';

const WorkDetail = () => {
  useDispatchInit();
  const work = useSelector(selectWorkDetails);
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
