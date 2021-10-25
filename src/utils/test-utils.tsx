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
  function Wrapper({ children }: { children: ReactElement }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
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
  const view = render(component);
  expect(error).toHaveBeenCalledTimes(1);
  expect(error).toHaveBeenCalledWith(
    'Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.%s',
    expect.any(String),
  );
  console.error = originalError;
  return view;
};

export const renderIgnoringGsapWarning = (component: React.ReactElement) => {
  const originalWarn = console.warn;
  const error = jest.fn();
  console.warn = error;
  const view = render(component);
  expect(error).toHaveBeenCalled();
  console.warn = originalWarn;
  return view;
};
