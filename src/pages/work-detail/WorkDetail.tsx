import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './WorkDetail.scss';
import WorkDetailDescription from './components/WorkDetailDescription';
import WorkPreviewCarousel from './components/WorkPreviewCarousel';
import Button from '../../components/ui/Button';
import BackArrow from '../../components/ui/BackArrow';
import Strokes from '../../components/Strokes';
import { onInit, selectIsInit, selectWorkDetails } from '../../store/store';
import useAnimation from '../../hooks/useAnimation';
import { ReactComponent as PlayStoreIcon } from '../../assets/icons/playstore.svg';
import { ReactComponent as AppStoreIcon } from '../../assets/icons/appstore.svg';
import FakeLink from '../../components/ui/FakeLink';

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

  const getUrl = (url: string): any => work.links.find((e) => e.type === url);

  return (
    <>
      <section className="work-detail-sec">
        <BackArrow>
          Turn Back Home
        </BackArrow>
        <Strokes />
        <WorkDetailDescription work={work} setCanStartCarAnimation={setCanStartCarAnimation} />
        <div className="work-links">
          {work.links?.length
            ? (
              <>
                {(getUrl('android') || getUrl('ios'))
                   && (
                   <div>
                     {getUrl('android') && <FakeLink onClick={() => goTo(getUrl('android').url)}><PlayStoreIcon /></FakeLink>}
                     {getUrl('ios') && <FakeLink onClick={() => goTo(getUrl('ios').url)}><AppStoreIcon /></FakeLink>}
                   </div>
                   )}
                {getUrl('web') && (
                  <div>
                    <Button key={getUrl('web')?.url} onClick={() => goTo(getUrl('web')?.url)}>{types.web}</Button>
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
            )
            : <Button disabled>Coming Soon</Button>}
          {work.repoUrl && !getUrl('web') && (
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
