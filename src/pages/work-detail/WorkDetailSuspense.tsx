import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore/lite';

import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';
import { onSetWorkDetails } from '../../store/store';
import { db } from '../../App';

const WorkDetailSuspense = () => {
  const dispatch = useDispatch();
  const { id }: {id: string} = useParams();
  const history = useHistory();
  const component = useSuspenseAnimation(
    import('./WorkDetail'),
    {
      fetchData: getDoc(doc(db, 'project-details', id)),
      setData: (query: any) => {
        if (query.exists()) {
          dispatch(onSetWorkDetails(query.data()));
        } else {
          history.goBack();
        }
      },
    },
  );

  return component;
};

export default WorkDetailSuspense;
