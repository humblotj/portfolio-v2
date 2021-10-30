import { render, screen, waitFor } from '../../../utils/test-utils';
import About from '../components/About';

it('reveals animation', async () => {
  render(
    <About closeContactModal={() => {}} setAboutAnimationDone={() => {}} />,
  );
  await waitFor(
    () => expect(screen.getByRole('img')).toHaveStyle('opacity:1'),
    { timeout: 3000 },
  );
  await waitFor(
    () =>
      expect(screen.getByText('Seoul, South Korea')).toHaveStyle('opacity:1'),
    { timeout: 3000 },
  );
});
