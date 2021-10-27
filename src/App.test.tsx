import { MemoryRouter } from 'react-router-dom';
import { getDocs } from 'firebase/firestore/lite';
import { getAnalytics } from 'firebase/analytics';

import { render, screen } from './utils/test-utils';
import { WorkProps } from './interface';
import App from './App';

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

jest.mock('gsap/ScrollTrigger', () =>
  jest.requireActual('gsap/dist/ScrollTrigger'),
);

const mockedGetDocs = getDocs as jest.Mock;
jest.mock('firebase/firestore/lite', () => {
  return {
    __esModule: true,
    getDocs: jest.fn(),
    collection: jest.fn(),
    getFirestore: jest.fn(),
  };
});

jest.mock('firebase/analytics', () => {
  return {
    __esModule: true,
    getAnalytics: jest.fn(),
  };
});

describe('app test', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
      get() {
        return this.textContent;
      },
      set(text: string) {
        this.textContent = text;
      },
    });

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
  });

  it('renders contact', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    await screen.findByText('Contact', undefined, { timeout: 3000 });
  });
});
