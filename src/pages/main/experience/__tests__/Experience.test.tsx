import { getDocs } from 'firebase/firestore/lite';

import { render, screen } from 'utils/test-utils';
import Experience from '../Experience';

const mockedGetDocs = getDocs as jest.Mock;
jest.mock('firebase/firestore/lite', () => {
  return {
    __esModule: true,
    getDocs: jest.fn(),
    collection: jest.fn(),
    getFirestore: jest.fn(),
    orderBy: jest.fn(),
    query: jest.fn(),
  };
});

it('fetches jobs', async () => {
  mockedGetDocs.mockImplementation(() => [
    {
      id: 'gurume',
      data: () => ({
        order: 1,
        logo: '',
        companyName: 'gurume',
        position: 'position',
        period: 'period',
        bullets: ['bullet1', 'bullet2'],
      }),
    },
    {
      id: 'mglish',
      data: () => ({
        order: 1,
        logo: '',
        companyName: 'mglish',
        position: 'position',
        period: 'period',
        bullets: ['bullet1', 'bullet2'],
      }),
    },
  ]);

  render(<Experience />);
  await screen.findByText('gurume');
  await screen.findByText('mglish');
});
