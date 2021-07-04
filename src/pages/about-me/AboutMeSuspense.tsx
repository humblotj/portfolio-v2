import {
  ComponentType, LazyExoticComponent, Suspense, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';

import { selectIsAboutModalOpen } from '../../store/store';
import lazyWithRetry from '../../utils/lazyWithRetry';

const AboutMeSuspense = () => {
  const isAboutModalOpen = useSelector(selectIsAboutModalOpen);
  const [DeferredComponent, setDeferredComponent] = useState<LazyExoticComponent<ComponentType<any>>| string>('div');

  useEffect(() => {
    if (isAboutModalOpen && DeferredComponent === 'div') {
      setDeferredComponent(lazyWithRetry(() => import('./AboutMe')));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAboutModalOpen]);

  return (
    <Suspense fallback={<div />}>
      <DeferredComponent />
    </Suspense>
  );
};

export default AboutMeSuspense;
