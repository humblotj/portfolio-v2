import { render, screen } from '@testing-library/react';
import TextField from '../TextField';

it('has placeholder', () => {
  render(<TextField placeholder="placeholder" />);
  expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
});
