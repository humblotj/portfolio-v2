import {
  onToggleAboutModal,
  storeReducer as reducer,
  RootState,
  onInit,
  onSetLoading,
} from './../store';

const initialState: RootState = {
  isAboutModalOpen: false,
  isInit: false,
  isLoading: true,
  works: [],
  workDetails: null,
};

it('should return the initial state', () => {
  expect(reducer(undefined, {} as any)).toEqual(initialState);
});

it('toggles about modal', () => {
  const openStore = reducer(initialState, onToggleAboutModal(true));
  expect(openStore).toEqual({
    ...initialState,
    isAboutModalOpen: true,
  });
  expect(reducer(openStore, onToggleAboutModal(false))).toEqual(initialState);
});

it('inits', () => {
  expect(reducer(undefined, onInit())).toEqual({
    ...initialState,
    isInit: true,
  });
});

it('sets loading', () => {
  const store = reducer(undefined, onSetLoading(false));
  expect(store).toEqual({
    ...initialState,
    isLoading: false,
  });
  expect(reducer(store, onSetLoading(true))).toEqual(initialState);
});
