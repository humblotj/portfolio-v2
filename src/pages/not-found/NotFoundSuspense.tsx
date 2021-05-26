import { Suspense } from 'react';

import Loading from '../../components/Loading';
import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';

const NotFoundSuspense = () => {
  const {
    DeferredComponent,
    hasImportFinished,
    enableComponent,
  } = useSuspenseAnimation(
    import('./NotFound'),
  );

  return (
    <Suspense fallback={(
      <Loading
        hasImportFinished={hasImportFinished}
        enableComponent={enableComponent}
      />
        )}
    >
      <DeferredComponent />
    </Suspense>
  );
};

export default NotFoundSuspense;
