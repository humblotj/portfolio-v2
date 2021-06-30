import { Suspense } from 'react';
import { useDispatch } from 'react-redux';

import Loading from '../../components/Loading';
import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';
import { onSetWorks } from '../../store/store';
import { WorkProps } from '../../interface';
import useFirebase from '../../hooks/useFirebase';

const MainSuspense = () => {
  const dispatch = useDispatch();
  const { getDB } = useFirebase();
  const {
    DeferredComponent,
    hasImportFinished,
    enableComponent,
  } = useSuspenseAnimation(
    import('./Main'),
    {
      fetchData: getDB().then((db) => db.collection('projects').get()),
      setData: (query: any) => {
        const works: WorkProps[] = [];
        query.forEach((doc: any) => {
          works.push({ ...doc.data(), id: doc.id });
        });
        dispatch(onSetWorks(works));
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
