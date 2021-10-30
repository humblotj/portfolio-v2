import { initialState } from '../../../store/store';
import { render, screen, waitFor } from '../../../utils/test-utils';
import AboutMeSuspense from '../AboutMeSuspense';

test('about me animation', async () => {
  render(<AboutMeSuspense />, {
    initialState: { ...initialState, isAboutModalOpen: true },
  });
  await waitFor(
    () => expect(screen.getByTestId('skills')).toHaveStyle('opacity:1;'),
    { timeout: 3000 },
  );
});
