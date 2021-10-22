import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Bounce from '../Bounce';

it('bounces', async () => {
  render(<Bounce>Bounce</Bounce>);
  const span = screen.getByText('Bounce');
  expect(span).not.toHaveClass('bounce');
  userEvent.hover(span);
  expect(span).toHaveClass('bounce');
  userEvent.unhover(span);
  expect(span).toHaveClass('bounce');
  userEvent.hover(span);
  expect(span).toHaveClass('bounce');
  await waitFor(() => expect(span).not.toHaveClass('bounce'));
});

test('unmount', () => {
  render(<Bounce>Bounce</Bounce>);
  userEvent.hover(screen.getByText('Bounce'));
  cleanup();
});
