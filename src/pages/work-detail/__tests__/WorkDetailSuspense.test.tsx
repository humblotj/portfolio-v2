import { Suspense } from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { getDoc } from 'firebase/firestore/lite';

import { render, screen, waitFor } from '../../../utils/test-utils';
import { WorkDetailProps } from '../../../interface';
import WorkDetailSuspense from '../WorkDetailSuspense';

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

const mockedGetDoc = getDoc as jest.Mock;

jest.mock('firebase/firestore/lite', () => {
  return {
    __esModule: true,
    getDoc: jest.fn(),
    doc: jest.fn(),
    getFirestore: jest.fn(),
  };
});

it('renders links', async () => {
  mockedGetDoc.mockImplementation(() => ({
    exists: () => true,
    data: () => workDetails,
  }));

  render(
    <MemoryRouter>
      <Suspense fallback={<div />}>
        <WorkDetailSuspense />
      </Suspense>
    </MemoryRouter>,
  );
  await screen.findByTestId('ios', undefined, { timeout: 4000 });
  await screen.findByTestId('android', undefined, { timeout: 4000 });
  await screen.findByText('Visit Site', undefined, { timeout: 4000 });
  await screen.findByText('View Code', undefined, { timeout: 4000 });
});

test('data doesnt exist', async () => {
  mockedGetDoc.mockImplementation(() => ({
    exists: () => false,
    data: () => null,
  }));
  const historyMock = {
    goBack: jest.fn(),
    location: {},
    listen: jest.fn(),
  } as any;

  render(
    <Router history={historyMock}>
      <Suspense fallback={<div />}>
        <WorkDetailSuspense />
      </Suspense>
    </Router>,
  );
  // eslint-disable-next-line @typescript-eslint/unbound-method
  await waitFor(() => expect(historyMock.goBack).toBeCalled(), {
    timeout: 3000,
  });
});
