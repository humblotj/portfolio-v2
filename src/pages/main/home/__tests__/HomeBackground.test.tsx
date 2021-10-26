import { render, screen, waitFor } from '../../../../utils/test-utils';
import HomeBackground from '../components/HomeBackground';

test('reveals animation', async () => {
  render(<HomeBackground />);
  await waitFor(
    () =>
      expect(screen.getByTestId('abstract-background')).toHaveStyle(
        'opacity:1',
      ),
    { timeout: 3000 },
  );
});
