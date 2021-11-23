import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  doc,
  getDoc,
  DocumentSnapshot,
  getFirestore,
} from 'firebase/firestore/lite';

import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';
import { onWorkDetailsFetched } from '../../store/store';
import { WorkDetailProps } from '../../interface';

const WorkDetailSuspense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const component = useSuspenseAnimation(import('./WorkDetail'), {
    fetchData: getDoc(doc(getFirestore(), 'project-details', id!)),
    onDataFetched: (query: DocumentSnapshot<WorkDetailProps>) => {
      if (query.exists()) {
        dispatch(onWorkDetailsFetched(query.data()));
      } else {
        navigate(-1);
      }
    },
  });

  return component;
};

export default WorkDetailSuspense;
