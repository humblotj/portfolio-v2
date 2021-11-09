import { getDocs } from 'firebase/firestore/lite';

import {
  render,
  screen,
  waitFor,
  setWindowWidth,
} from '../../../../utils/test-utils';
import Decks from '../Decks';
import picture from '../../../../assets/background.jpg';

const mockedGetDocs = getDocs as jest.Mock;
jest.mock('firebase/firestore/lite', () => {
  return {
    __esModule: true,
    getDocs: jest.fn(),
    collection: jest.fn(),
    getFirestore: jest.fn(),
  };
});

it('renders 40 pictures', async () => {
  mockedGetDocs.mockImplementation(() => [
    {
      id: 'mobile',
      data: () => ({
        pictures: [picture, picture, picture, picture],
      }),
    },
    {
      id: 'web',
      data: () => ({
        pictures: [picture, picture, picture, picture],
      }),
    },
  ]);

  render(<Decks />);
  await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(40));
});

it('renders 24 pictures', async () => {
  setWindowWidth(400);
  mockedGetDocs.mockImplementation(() => [
    {
      id: 'mobile',
      data: () => ({
        pictures: [picture, picture, picture, picture],
      }),
    },
    {
      id: 'web',
      data: () => ({
        pictures: [picture, picture, picture, picture],
      }),
    },
  ]);

  render(<Decks />);
  await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(24));
});
