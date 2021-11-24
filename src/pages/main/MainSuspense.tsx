import { useDispatch } from 'react-redux';
import {
  collection,
  getDocs,
  QuerySnapshot,
  getFirestore,
} from 'firebase/firestore/lite';

import useLoadComponent from '../../hooks/useLoadComponent';
import { onWorksFetched } from '../../store/store';
import { WorkProps } from '../../interface';

const MainSuspense: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const component = useLoadComponent(import('./Main'), {
    fetchData: getDocs(collection(getFirestore(), 'projects')),
    onDataFetched: (query: QuerySnapshot<WorkProps>) => {
      const works: WorkProps[] = [];
      query.forEach((doc) => {
        works.push({ ...doc.data(), id: doc.id });
      });
      dispatch(onWorksFetched(works));
    },
  });

  return component;
};

export default MainSuspense;
