import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import useFirebase from '../../hooks/useFirebase';
import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';
import { onSetWorkDetails } from '../../store/store';

const WorkDetailSuspense = () => {
  const dispatch = useDispatch();
  const { id }: {id: string} = useParams();
  const history = useHistory();
  const { getDB } = useFirebase();
  const {
    DeferredComponent,
    hasImportFinished,
    enableComponent,
  } = useSuspenseAnimation(
    import('./WorkDetail'),
    {
      fetchData: getDB().then((db) => db.collection('project-details').doc(id).get()),
      setData: (query: any) => {
        if (query.exists) {
          dispatch(onSetWorkDetails(query.data()));
        } else {
          history.goBack();
        }
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

export default WorkDetailSuspense;
