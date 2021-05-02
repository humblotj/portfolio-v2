/* eslint-disable no-param-reassign */
import {
  combineReducers, configureStore, createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  isAboutModalOpen: false,
  isInit: false,
  works: null,
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
  onSetWorks,
  onSetWorkDetails,
} = store.actions;

export const selectIsAboutModalOpen = (
  state: { store: typeof initialState },
) => state.store.isAboutModalOpen;
export const selectIsInit = (state: { store: typeof initialState }) => state.store.isInit;
export const selectWorks = (state: { store: typeof initialState }) => state.store.works;
export const selectWorkDetails = (state: { store: typeof initialState }) => state.store.workDetails;

const reducer = combineReducers({ store: store.reducer });

export default configureStore({ reducer });
