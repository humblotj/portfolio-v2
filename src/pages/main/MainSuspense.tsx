import { useDispatch } from 'react-redux';
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore/lite';

import useSuspenseAnimation from '../../hooks/useSuspenseAnimation';
import { onSetWorks } from '../../store/store';
import { WorkProps } from '../../interface';
import { db } from '../../App';

const MainSuspense: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const component = useSuspenseAnimation(import('./Main'), {
    fetchData: getDocs(collection(db, 'projects')),
    setData: (query: QuerySnapshot<WorkProps>) => {
      const works: WorkProps[] = [];
      query.forEach((doc) => {
        works.push({ ...doc.data(), id: doc.id });
      });
      dispatch(onSetWorks(works));
    },
  });

  return component;
};

export default MainSuspense;
