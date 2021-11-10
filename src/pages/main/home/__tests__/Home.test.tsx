import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../../../utils/test-utils';
import Home from '../Home';

it('called scrollintoview', async () => {
  const scrollIntoViewMock = jest.fn();
  render(
    <Home
      whatIDoRef={{ current: { scrollIntoView: scrollIntoViewMock } } as any}
    />,
  );
  await waitFor(
    () =>
      expect(
        screen.getByText('I am a front-end developer based in Seoul.'),
      ).toHaveStyle('opacity:1'),
    { timeout: 3000 },
  );
  const link = screen.getAllByRole('link');
  userEvent.click(link[4]);
  expect(scrollIntoViewMock).toHaveBeenCalled();
});
