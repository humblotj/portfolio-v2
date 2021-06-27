/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import lazyWithRetry from '../utils/lazyWithRetry';

const deferPromise = () => {
  let resolve;
  const promise = new Promise((_resolve) => {
    resolve = _resolve;
  });
  return { resolve, promise };
};

const useModalSuspenseAnimation = (import_: Promise<any>, isModalOpen: boolean) => {
  const [state, setState] = useState<any>({ status: 'LAZY', DeferredComponent: 'div', deferred: null });

  useEffect(() => {
    if (isModalOpen && state.status !== 'IMPORT_FINISHED') {
      const deferred: any = deferPromise();
      // component object reference  is kept stable, since it's stored in state.

      const DeferredComponent = lazyWithRetry(() => Promise.all([
        import_.then((imp) => {
          setState((prev: any) => ({ ...prev, status: 'IMPORT_FINISHED' }));
          return imp;
        }),
        deferred.promise,
      ]).then(([imp]) => {
        // eslint-disable-next-line no-use-before-define
        enableComponent();
        return imp;
      }));

      setState((prev: any) => ({ ...prev, DeferredComponent, deferred }));
    }
  }, [isModalOpen]);

  const enableComponent = useCallback(() => {
    if (state.status === 'IMPORT_FINISHED') {
      setState((prev: any) => ({ ...prev, status: 'ENABLED' }));
      state.deferred?.resolve();
    }
  }, [state]);

  return {
    hasImportFinished: state.status === 'IMPORT_FINISHED',
    DeferredComponent: state.DeferredComponent,
    enableComponent,
  };
};

export default useModalSuspenseAnimation;
