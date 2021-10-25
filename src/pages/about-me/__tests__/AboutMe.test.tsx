import { initialState } from '../../../store/store';
import { render, screen, waitFor } from '../../../utils/test-utils';
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
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 500,
  });

  render(<AboutMe />, {
    initialState: { ...initialState, isAboutModalOpen: true },
  });
  await waitFor(() =>
    expect(screen.getByTestId('skills')).toHaveStyle('opacity:1;'),
  );
});
