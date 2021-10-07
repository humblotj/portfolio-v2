/* eslint-disable no-param-reassign */
import {
  combineReducers,
  configureStore,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { WorkDetailProps, WorkProps } from '../interface';

const initialState: {
  isAboutModalOpen: boolean;
  isInit: boolean;
  isLoading: boolean;
  works: WorkProps[];
  workDetails: WorkDetailProps | null;
} = {
  isAboutModalOpen: false,
  isInit: false,
  isLoading: true,
  works: [],
  workDetails: null,
};

const store = createSlice({
  name: 'store',
  initialState,
  reducers: {
    onToggleAboutModal(state, action) {
      if (window.innerWidth < 768) {
        document.body.style.overflow = action.payload ? 'hidden' : '';
      }
      state.isAboutModalOpen = action.payload;
    },
    onInit(state) {
      state.isInit = true;
    },
    onSetLoading(state, action) {
      state.isLoading = action.payload;
    },
    onSetWorks(state, action) {
      state.works = action.payload;
    },
    onSetWorkDetails(state, action) {
      state.workDetails = action.payload;
    },
  },
});

export const {
  onToggleAboutModal,
  onInit,
  onSetLoading,
  onSetWorks,
  onSetWorkDetails,
} = store.actions;

export const selectIsAboutModalOpen = (state: { store: typeof initialState }) =>
  state.store.isAboutModalOpen;
export const selectIsInit = (state: { store: typeof initialState }) =>
  state.store.isInit;
export const selectIsLoading = (state: { store: typeof initialState }) =>
  state.store.isLoading;
export const selectWorks = (state: { store: typeof initialState }) =>
  state.store.works;
export const selectWorksSorted = createSelector(selectWorks, (works) =>
  works.slice().sort((a, b) => (a.order < b.order ? 1 : -1)),
);
export const selectWorkDetails = (state: { store: typeof initialState }) =>
  state.store.workDetails;

const reducer = combineReducers({ store: store.reducer });

export default configureStore({ reducer });
