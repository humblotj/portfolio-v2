import userEvent from '@testing-library/user-event';
import { initialState } from '../../../store/store';
import {
  render,
  screen,
  setWindowWidth,
  waitFor,
} from '../../../utils/test-utils';
import AboutMe from '../AboutMe';

test('about me animation', async () => {
  render(<AboutMe />, {
    initialState: { ...initialState, isAboutModalOpen: true },
  });
  await waitFor(() =>
    expect(screen.getByTestId('skills')).toHaveStyle('opacity:1;'),
  );
});

test('small width', async () => {
  setWindowWidth(500);

  render(<AboutMe />, {
    initialState: { ...initialState, isAboutModalOpen: true },
  });
  await waitFor(() =>
    expect(screen.getByTestId('skills')).toHaveStyle('opacity:1;'),
  );
});

it('close contact modal', async () => {
  render(<AboutMe />, {
    initialState: { ...initialState, isAboutModalOpen: true },
  });

  const button = screen.getAllByLabelText('close')[0];
  userEvent.click(button);

  await waitFor(() =>
    expect(screen.queryByTestId('skills')).not.toBeInTheDocument(),
  );
});
