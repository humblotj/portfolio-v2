import { getDocs } from 'firebase/firestore/lite';
import { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { WorkProps } from 'interface';
import { initialState } from 'store/store';
import { render, screen } from 'utils/test-utils';
import MainSuspense from '../MainSuspense';

const works: WorkProps[] = [
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
    order: 1,
  },
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
    order: 2,
  },
];

const mockedGetDocs = getDocs as jest.Mock;
jest.mock('firebase/firestore/lite', () => {
  return {
    __esModule: true,
    getDocs: jest.fn(),
    collection: jest.fn(),
    getFirestore: jest.fn(),
  };
});

jest.mock('gsap/ScrollTrigger', () =>
  jest.requireActual('gsap/dist/ScrollTrigger'),
);

it('renders links', async () => {
  mockedGetDocs.mockImplementation(() => [
    {
      id: 1,
      data: () => works[0],
    },
    {
      id: 2,
      data: () => works[1],
    },
  ]);

  render(
    <MemoryRouter>
      <Suspense fallback={<div />}>
        <MainSuspense />
      </Suspense>
    </MemoryRouter>,
    { initialState: { ...initialState, isInit: true } },
  );
  await screen.findByText('name1', undefined, { timeout: 3000 });
  await screen.findByText('name2', undefined, { timeout: 3000 });
});
