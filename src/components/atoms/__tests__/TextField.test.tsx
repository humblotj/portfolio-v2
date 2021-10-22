import { render, screen } from '@testing-library/react';
import TextField from '../TextField';

it('has placeholder', () => {
  render(<TextField placeholder="placeholder" />);
  expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
});

it('is input', () => {
  render(<TextField />);
  expect(screen.getByRole('textbox').tagName).toEqual('INPUT');
});

it('is textarea', () => {
  render(<TextField textarea />);
  expect(screen.getByRole('textbox').tagName).toEqual('TEXTAREA');
});
