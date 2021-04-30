import {
  lazy, useCallback, useState,
} from 'react';

const deferPromise = () => {
  let resolve;
  const promise = new Promise((_resolve) => {
    resolve = _resolve;
  });
  return { resolve, promise };
};

const useSuspenseAnimation = (import_: Promise<any>) => {
  const [state, setState] = useState(() => {
    const deferred: any = deferPromise();
    // component object reference  is kept stable, since it's stored in state.
    const DeferredComponent = lazy(() => Promise.all([
      // again some fake delay for illustration
      Promise.all([import_,
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]).then(([imp, _]: any) => {
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
