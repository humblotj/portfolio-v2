import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './WorkDetail.scss';
import WorkDetailDescription from './components/WorkDetailDescription';
import WorkPreviewCarousel from './components/WorkPreviewCarousel';
import Button from '../../components/atoms/Button';
import BackArrow from '../../components/atoms/BackArrow';
import Strokes from '../../components/molecules/Strokes';
import FakeLink from '../../components/atoms/FakeLink';
import { onInit, selectIsInit, selectWorkDetails } from '../../store/store';
import useAnimation from '../../hooks/useAnimation';
import { ReactComponent as PlayStoreIcon } from '../../assets/icons/playstore.svg';
import { ReactComponent as AppStoreIcon } from '../../assets/icons/appstore.svg';

const types = {
  ios: 'Apple Store',
  android: 'Play Store',
  web: 'Visit site',
};

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

  const goTo = (url: string) => window.open(url, '_blank');

  return (
    <>
      <section className="work-detail-sec">
        <BackArrow>Turn Back Home</BackArrow>
        <Strokes />
        <WorkDetailDescription work={work} />
        <div className="work-links">
          {!!Object.keys(work.links || {}).length && (
            <>
              {(work.links.android || work.links.ios) && (
                <div>
                  {work.links.ios && (
                    <FakeLink onClick={() => goTo(work.links.ios as string)}>
                      <AppStoreIcon />
                    </FakeLink>
                  )}
                  {work.links.android && (
                    <FakeLink
                      onClick={() => goTo(work.links.android as string)}
                    >
                      <PlayStoreIcon />
                    </FakeLink>
                  )}
                </div>
              )}
              {work.links.web && (
                <div>
                  <Button
                    key={work.links.web}
                    onClick={() => goTo(work.links.web as string)}
                  >
                    {types.web}
                  </Button>
                  {work.repoUrl && (
                    <Button
                      color="secondary"
                      onClick={() => goTo(work.repoUrl || '')}
                    >
                      View Code
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
          {work.repoUrl && !work.links?.web && (
            <Button color="secondary" onClick={() => goTo(work.repoUrl || '')}>
              View Code
            </Button>
          )}
        </div>
        <WorkPreviewCarousel work={work} />
      </section>
    </>
  );
};

export default WorkDetail;
