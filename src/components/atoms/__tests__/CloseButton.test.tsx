import { render, screen } from '@testing-library/react';
import CloseButton from '../CloseButton';

it('renders button', () => {
  render(<CloseButton onClick={() => {}} />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
