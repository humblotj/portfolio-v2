import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSetLoading, selectIsInit } from '../store/store';
import lazyWithRetry from '../utils/lazyWithRetry';

const deferPromise = () => {
  let resolve;
  const promise = new Promise((_resolve) => {
    resolve = _resolve;
  });
  return { resolve, promise };
};

const useSuspenseAnimation = (import_: Promise<any>,
  { fetchData, setData }: {fetchData: Promise<any>|null, setData: any}
  = { fetchData: null, setData: null }) => {
  const dispatch = useDispatch();
  const isInit = useSelector(selectIsInit);

  const [state, setState] = useState(() => {
    const deferred: any = deferPromise();
    // component object reference  is kept stable, since it's stored in state.

    const DeferredComponent = lazyWithRetry(() => Promise.all([
      Promise.all([import_,
        fetchData,
        new Promise((resolve) => setTimeout(resolve, isInit ? 700 : 1000)),
      ]).then(([imp, query, _]: any) => {
        if (fetchData) {
          setData(query);
        }
        dispatch(onSetLoading(false));
        setTimeout(() => state.deferred.resolve(), 300);
        return imp;
      }),
      deferred.promise,
    ]).then(([imp]) => imp));

    return {
      DeferredComponent,
      deferred,
    };
  });

  return <state.DeferredComponent />;
};

export default useSuspenseAnimation;
