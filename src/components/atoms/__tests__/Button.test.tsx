import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

it('has class custom-class', () => {
  render(<Button className="custom-class" />);
  expect(screen.getByRole('button')).toHaveClass('custom-class');
  userEvent.click(screen.getByRole('button'));
});

it('is disabled', () => {
  render(<Button disabled />);
  expect(screen.getByRole('button')).toBeDisabled();
});
