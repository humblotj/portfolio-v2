/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MemoryRouter } from 'react-router-dom';
import { getDocs } from 'firebase/firestore/lite';
import { getAnalytics } from 'firebase/analytics';

import { render, screen, setWindowWidth, waitFor } from './utils/test-utils';
import { WorkProps } from './interface';
import userEvent from '@testing-library/user-event';

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

    window.scrollTo = jest.fn();

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

  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('alerts', () => {
    jest.isolateModules(() => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      Object.assign(process.env, {
        REACT_APP_API_KEY: '',
      });
      const App = require('./App').default;
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });

  it('doesnt alert', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.isolateModules(() => {
      const App = require('./App').default;
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      expect(window.alert).not.toHaveBeenCalled();
      expect(getAnalytics).toHaveBeenCalled();
    });
  });

  it('doesnt call getanalytics', () => {
    jest.isolateModules(() => {
      Object.assign(process.env, {
        NODE_ENV: 'development',
      });
      const App = require('./App').default;
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      expect(getAnalytics).not.toHaveBeenCalled();
    });
  });

  it('opens about modal', async () => {
    let App: any;

    setWindowWidth(500);

    Object.assign(process.env, {
      NODE_ENV: 'development',
    });

    jest.isolateModules(() => {
      App = require('./App').default;
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutMeButton = await screen.findByText('About me', undefined, {
      timeout: 5000,
    });
    userEvent.click(aboutMeButton);
    expect(document.body).toHaveStyle('overflow: hidden;');
    await screen.findByText('Proficient in:', undefined, { timeout: 2000 });
  });
});
