import { render, screen, waitFor } from '../../../../utils/test-utils';
import Skills from '../Skills';

it('reveals animation', async () => {
  render(<Skills closeContactModal={() => {}} aboutAnimationDone />);
  await waitFor(
    () => expect(screen.getByText('Proficient in:')).toHaveStyle('opacity:1'),
    { timeout: 2000 },
  );
  await waitFor(
    () => expect(screen.getByText('Familiar with:')).toHaveStyle('opacity:1'),
    { timeout: 2000 },
  );
  await waitFor(
    () => expect(screen.getByText('Learning:')).toHaveStyle('opacity:1'),
    { timeout: 2000 },
  );
});
