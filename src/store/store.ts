import {
  combineReducers,
  configureStore,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { WorkDetailProps, WorkProps } from 'interface';

export interface RootState {
  isAboutModalOpen: boolean;
  isInit: boolean;
  isLoading: boolean;
  works: WorkProps[];
  workDetails: WorkDetailProps | null;
}

export const initialState: RootState = {
  isAboutModalOpen: false,
  isInit: false,
  isLoading: true,
  works: [],
  workDetails: null,
};

const store = createSlice({
  name: 'store/store',
  initialState,
  reducers: {
    onToggleAboutModal(state, action: PayloadAction<boolean>) {
      if (window.innerWidth < 768) {
        document.body.style.overflow = action.payload ? 'hidden' : '';
      }
      state.isAboutModalOpen = action.payload;
    },
    onInit(state) {
      state.isInit = true;
    },
    onChangeLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    onWorksFetched(state, action: PayloadAction<WorkProps[]>) {
      state.works = action.payload;
    },
    onWorkDetailsFetched(state, action: PayloadAction<WorkDetailProps | null>) {
      state.workDetails = action.payload;
    },
  },
});

export const {
  onToggleAboutModal,
  onInit,
  onChangeLoading,
  onWorksFetched,
  onWorkDetailsFetched,
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

export const storeReducer = store.reducer;
export const reducer = combineReducers({ store: store.reducer });

export default configureStore({ reducer });
