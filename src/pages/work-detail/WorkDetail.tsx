import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './WorkDetail.scss';
import WorkDetailDescription from './components/WorkDetailDescription';
import WorkPreviewCarousel from './components/WorkPreviewCarousel';
import Button from '../../components/atoms/Button';
import BackArrow from '../../components/atoms/BackArrow';
import Strokes from '../../components/molecules/Strokes';
import { onInit, selectIsInit, selectWorkDetails } from '../../store/store';
import useAnimation from '../../hooks/useAnimation';
import { ReactComponent as PlayStoreIcon } from '../../assets/icons/playstore.svg';
import { ReactComponent as AppStoreIcon } from '../../assets/icons/appstore.svg';
import FakeLink from '../../components/atoms/FakeLink';

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

  const getUrl = (url: string) => work.links.find((e) => e.type === url);

  return (
    <>
      <section className="work-detail-sec">
        <BackArrow>Turn Back Home</BackArrow>
        <Strokes />
        <WorkDetailDescription work={work} />
        <div className="work-links">
          {!!work.links?.length && (
            <>
              {(getUrl('android') || getUrl('ios')) && (
                <div>
                  {getUrl('ios') && (
                    <FakeLink
                      onClick={() => goTo(getUrl('ios')?.url as string)}
                    >
                      <AppStoreIcon />
                    </FakeLink>
                  )}
                  {getUrl('android') && (
                    <FakeLink
                      onClick={() => goTo(getUrl('android')?.url as string)}
                    >
                      <PlayStoreIcon />
                    </FakeLink>
                  )}
                </div>
              )}
              {getUrl('web') && (
                <div>
                  <Button
                    key={getUrl('web')?.url}
                    onClick={() => goTo(getUrl('web')?.url as string)}
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
          {work.repoUrl && !getUrl('web') && (
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
