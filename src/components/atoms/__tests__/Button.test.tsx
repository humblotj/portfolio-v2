import { render, screen } from '@testing-library/react';
import Button from '../Button';

it('has class custom-class', () => {
  render(<Button className="custom-class" />);
  expect(screen.getByRole('button')).toHaveClass('custom-class');
});

it('is disabled', () => {
  render(<Button disabled />);
  expect(screen.getByRole('button')).toBeDisabled();
});
