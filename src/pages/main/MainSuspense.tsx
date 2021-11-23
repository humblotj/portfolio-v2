import { useDispatch } from 'react-redux';
import {
  collection,
  getDocs,
  QuerySnapshot,
  getFirestore,
} from 'firebase/firestore/lite';

import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';
import { onWorksFetched } from '../../store/store';
import { WorkProps } from '../../interface';

const MainSuspense: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const component = useSuspenseAnimation(import('./Main'), {
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
