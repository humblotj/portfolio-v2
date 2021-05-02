import { Suspense } from 'react';
import { useDispatch } from 'react-redux';

import Loading from '../../components/Loading';
import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';
import { onSetWorks } from '../../store/store';
import { WorkProps } from '../../interface';
import { db } from '../../App';

const MainSuspense = () => {
  const dispatch = useDispatch();
  const {
    DeferredComponent,
    hasImportFinished,
    enableComponent,
  } = useSuspenseAnimation(
    import('./Main'),
    {
      fetchData: db.collection('projects').get(),
      setData: (query: any) => {
        const works: WorkProps[] = [];
        query.forEach((doc: any) => {
          works.push({ ...doc.data(), id: doc.id });
        });
        console.log(works.sort((a, b) => (a.order < b.order ? 1 : -1)));
        dispatch(onSetWorks(works.sort((a, b) => (a.order < b.order ? 0 : 1))));
      },
    },
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
