/// <reference types="react-scripts" />

import { FirebaseOptions } from 'firebase/app';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_KEY: string;
    }
  }
}
