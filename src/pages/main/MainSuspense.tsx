import {
  collection,
  getDocs,
  getFirestore,
  QuerySnapshot,
} from 'firebase/firestore/lite';
import { useDispatch } from 'react-redux';

import useLoadComponent from 'hooks/useLoadComponent';
import { WorkProps } from 'interface';
import { onWorksFetched } from 'store/store';

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
