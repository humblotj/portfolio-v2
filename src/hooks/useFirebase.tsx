import { useCallback, useRef } from 'react';
import type firebase from 'firebase';

const config = JSON.parse(process.env.REACT_APP_API_KEY as any);

const useFirebase = () => {
  const firebaseRef = useRef<typeof firebase | null>(null);

  const initFirebase = async () => {
    const { default: firebase } = await import('firebase/app');

    await Promise.all([
      import('firebase/analytics'),
      import('firebase/firestore'),
    ]);

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      firebase.firestore().enablePersistence();

      if (process.env.NODE_ENV !== 'development') {
        firebase.analytics();
      }
    }
    firebaseRef.current = firebase;
  };

  const getFirebase = useCallback(() => new Promise<typeof firebase>((resolve) => {
    if (firebaseRef.current) {
      resolve(firebaseRef.current);
    } else {
      initFirebase().then(() => resolve(firebaseRef.current as typeof firebase));
    }
  }), []);

  const getDB = useCallback(() => new Promise<any>((resolve) => {
    getFirebase().then((firebase) => resolve(firebase.firestore()));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return { getFirebase, getDB };
};

export default useFirebase;
