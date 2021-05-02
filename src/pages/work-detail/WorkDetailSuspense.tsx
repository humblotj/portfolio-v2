import { Suspense } from 'react';
import Loading from '../../components/Loading';
import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';

const WorkDetailSuspense = () => {
  const {
    DeferredComponent,
    hasImportFinished,
    enableComponent,
  } = useSuspenseAnimation(
    import('./WorkDetail'),
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

export default WorkDetailSuspense;
