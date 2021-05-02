import { Suspense } from 'react';
import Loading from '../../components/Loading';
import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';

const MainSuspense = () => {
  const {
    DeferredComponent,
    hasImportFinished,
    enableComponent,
  } = useSuspenseAnimation(
    import('./Main'),
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

export default MainSuspense;
