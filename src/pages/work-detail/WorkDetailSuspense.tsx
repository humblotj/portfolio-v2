import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  doc,
  getDoc,
  DocumentSnapshot,
  getFirestore,
} from 'firebase/firestore/lite';

import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';
import { onSetWorkDetails } from '../../store/store';
import { WorkDetailProps } from '../../interface';

const WorkDetailSuspense = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const component = useSuspenseAnimation(import('./WorkDetail'), {
    fetchData: getDoc(doc(getFirestore(), 'project-details', id as string)),
    setData: (query: DocumentSnapshot<WorkDetailProps>) => {
      if (query.exists()) {
        dispatch(onSetWorkDetails(query.data()));
      } else {
        navigate(-1);
      }
    },
  });

  return component;
};

export default WorkDetailSuspense;
