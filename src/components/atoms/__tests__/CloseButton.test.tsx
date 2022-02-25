import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CloseButton from '../CloseButton';

it('renders button', () => {
  render(<CloseButton />);
  expect(screen.getByRole('button')).toBeInTheDocument();
  userEvent.click(screen.getByRole('button'));
});
