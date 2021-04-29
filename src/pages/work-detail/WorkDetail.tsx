import { useContext, useEffect } from 'react';

import './WorkDetail.scss';
import WorkDetailDescription from './components/WorkDetailDescription';
import WorkPreviewCarousel from './components/WorkPreviewCarousel';
import Button from '../../components/ui/Button';
import BackArrow from '../../components/ui/BackArrow';
import WorkDetailParallax from './components/WorkDetailParallax';
import { StoreContext } from '../../context/StoreProvider';

const WorkDetail = () => {
  const { store: { isInit }, dispatch } = useContext(StoreContext);

  useEffect(() => {
    if (!isInit) {
      dispatch({ type: 'ON_INIT', payload: null });
    }
    dispatch({ type: 'SET_IS_LOADING', payload: false });
  }, []);

  return (
    <section className="work-detail-sec">
      <BackArrow>
        Turn Back Home
      </BackArrow>
      <WorkDetailDescription />
      <WorkDetailParallax />
      <div className="work-links">
        <Button>Visit Site</Button>
        <Button color="secondary">View Code</Button>
      </div>
      <WorkPreviewCarousel items={['q', 'q', 'q', 'q']} />
    </section>
  );
};

export default WorkDetail;
