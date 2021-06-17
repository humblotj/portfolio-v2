import { useCallback, useState } from 'react';
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
  const [state, setState] = useState(() => {
    const deferred: any = deferPromise();
    // component object reference  is kept stable, since it's stored in state.

    const DeferredComponent = lazyWithRetry(() => Promise.all([
      Promise.all([import_,
        fetchData,
        new Promise((resolve) => setTimeout(resolve, 1250)),
      ]).then(([imp, query, _]: any) => {
        if (fetchData) {
          setData(query);
        }
        // triggers re-render, so containing component can react
        setState((prev) => ({ ...prev, status: 'IMPORT_FINISHED' }));
        return imp;
      }),
      deferred.promise,
    ]).then(([imp]) => imp));

    return {
      status: 'LAZY',
      DeferredComponent,
      deferred,
    };
  });

  const enableComponent = useCallback(() => {
    if (state.status === 'IMPORT_FINISHED') {
      setState((prev) => ({ ...prev, status: 'ENABLED' }));
      state.deferred.resolve();
    }
  }, [state]);

  return {
    hasImportFinished: state.status === 'IMPORT_FINISHED',
    DeferredComponent: state.DeferredComponent,
    enableComponent,
  };
};

export default useSuspenseAnimation;
