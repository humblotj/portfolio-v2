import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ReactElement } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { reducer, RootState } from '../store/store';
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
      reducer,
      preloadedState: { store: initialState },
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
  const originalWarn = console.warn;
  const warn = jest.fn();
  console.warn = warn;

  function Wrapper({ children }: { children: ReactElement }) {
    return <Provider store={store}>{children}</Provider>;
  }

  const view = rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  console.warn = originalWarn;

  return view;
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };

export const renderIgnoringUnstableFlushDiscreteUpdates = (
  component: React.ReactElement,
) => {
  const originalError = console.error;
  const error = jest.fn();
  console.error = error;
  const view = rtlRender(component);
  expect(error).toHaveBeenCalledTimes(1);
  expect(error).toHaveBeenCalledWith(
    'Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.%s',
    expect.any(String),
  );
  console.error = originalError;
  return view;
};

export const setWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};
