import { render, screen } from '@testing-library/react';
import BurgerMenu from '../BurgerMenu';

it('has class open', () => {
  render(<BurgerMenu open toggleNav={() => {}} />);
  expect(screen.getByRole('button')).toHaveClass('open');
});

it('has not class open', () => {
  render(<BurgerMenu open={false} toggleNav={() => {}} />);
  expect(screen.getByRole('button')).not.toHaveClass('open');
});
