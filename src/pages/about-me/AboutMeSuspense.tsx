import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useModalSuspenseAnimation from '../../hooks/useModalSuspenseAnimation';
import { selectIsAboutModalOpen } from '../../store/store';

const AboutMeSuspense = () => {
  const isAboutModalOpen = useSelector(selectIsAboutModalOpen);
  const {
    DeferredComponent,
    hasImportFinished,
    enableComponent,
  } = useModalSuspenseAnimation(import('./AboutMe'), isAboutModalOpen);

  useEffect(() => {
    if (hasImportFinished) {
      enableComponent();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasImportFinished]);

  return (
    <Suspense fallback={<div />}>
      <DeferredComponent />
    </Suspense>
  );
};

export default AboutMeSuspense;
