import {
  doc,
  DocumentSnapshot,
  getDoc,
  getFirestore,
} from 'firebase/firestore/lite';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import useLoadComponent from 'hooks/useLoadComponent';
import { WorkDetailProps } from 'interface';
import { onWorkDetailsFetched } from 'store/store';

const WorkDetailSuspense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const component = useLoadComponent(import('./WorkDetail'), {
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
