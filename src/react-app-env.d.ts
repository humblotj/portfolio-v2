/// <reference types="react-scripts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_KEY: string;
    }
  }
}

declare module '*.mp4' {
  const src: string;
  export default src;
}
