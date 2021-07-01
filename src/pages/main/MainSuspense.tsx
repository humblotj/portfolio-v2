import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';

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
      fetchData: getDocs(collection(db, 'projects')),
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
