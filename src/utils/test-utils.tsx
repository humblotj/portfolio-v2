import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import { storeReducer, RootState } from '../store/store';
import { ReactElement } from 'react-router/node_modules/@types/react';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

function render(
  ui: ReactElement,
  {
    initialState = {
      isAboutModalOpen: false,
      isInit: false,
      isLoading: true,
      works: [],
      workDetails: null,
    },
    store = configureStore({
      reducer: storeReducer,
      preloadedState: initialState,
    }),
    ...renderOptions
  }: {
    initialState?: RootState;
    store?: EnhancedStore;
  } = {
    initialState: undefined,
    store: undefined,
  },
) {
  function Wrapper({ children }: { children: ReactElement }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
