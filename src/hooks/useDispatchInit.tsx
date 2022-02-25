import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onInit, selectIsInit } from '../store/store';

const useDispatchInit = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(selectIsInit);

  useEffect(() => {
    if (!isInit) {
      dispatch(onInit());
    }
  }, []);
};

export default useDispatchInit;
