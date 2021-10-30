import { WorkDetailProps, WorkProps } from './../../interface';
import {
  onToggleAboutModal,
  storeReducer as reducer,
  onInit,
  onSetLoading,
  initialState,
  onSetWorkDetails,
  onSetWorks,
  selectIsAboutModalOpen,
  selectIsInit,
  selectIsLoading,
  selectWorksSorted,
  selectWorkDetails,
} from './../store';

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

const workDetails: WorkDetailProps = {
  repoUrl: 'https://github.com',
  links: {
    web: 'https://github.com',
    ios: 'https://github.com',
    android: 'https://github.com',
  },
  name: 'name',
  description: 'description',
  nextWork: 'jrello',
  previousWork: 'iphone-12',
  index: 10,
  year: 2021,
  techs: ['React', 'Angular'],
  mainPreview: {
    type: 'web',
    url: '',
    height: 2416,
    width: 2416,
    urls: {},
  },
  previews: [] as any,
};

it('sets work details', () => {
  const store = reducer(undefined, onSetWorkDetails(workDetails));
  expect(store).toEqual({
    ...initialState,
    workDetails,
  });
});

const works: WorkProps[] = [
  {
    isPersonal: true,
    name: 'name1',
    description: 'description',
    techs: ['React', 'Angular'],
    preview: {
      type: 'web',
      url: '',
      height: 2416,
      width: 2416,
      urls: [],
    },
    order: 1,
  },
  {
    isPersonal: true,
    name: 'name2',
    description: 'description',
    techs: ['React', 'Angular'],
    preview: {
      type: 'web',
      url: '',
      height: 2416,
      width: 2416,
      urls: [],
    },
    order: 2,
  },
];

it('sets works', () => {
  const store = reducer(undefined, onSetWorks(works));
  expect(store).toEqual({
    ...initialState,
    works,
  });
});

const mockStore = () => ({
  store: { ...initialState, works, workDetails },
});

it('should select isAboutModalOpen', () => {
  const result = selectIsAboutModalOpen(mockStore());
  expect(result).toBe(false);
});

it('should select isInit', () => {
  const result = selectIsInit(mockStore());
  expect(result).toBe(false);
});

it('should select isLoading', () => {
  const result = selectIsLoading(mockStore());
  expect(result).toBe(true);
});

it('should select works', () => {
  const result = selectWorksSorted(mockStore());
  expect(JSON.stringify(result)).toBe(JSON.stringify([works[1], works[0]]));
});

it('should select works', () => {
  const result = selectWorksSorted({
    store: { ...initialState, works: [works[1], works[0]] },
  });
  expect(JSON.stringify(result)).toBe(JSON.stringify([works[1], works[0]]));
});

it('should select worksDetails', () => {
  const result = selectWorkDetails(mockStore());
  expect(result).toBe(workDetails);
});
