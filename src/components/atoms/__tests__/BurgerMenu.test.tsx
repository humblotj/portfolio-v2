import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import BurgerMenu from '../BurgerMenu';

it('has class open', () => {
  render(
    <MemoryRouter>
      <BurgerMenu open toggleNav={() => {}} />
    </MemoryRouter>,
  );
  expect(screen.getByRole('button')).toHaveClass('open');
});

it('has not class open', () => {
  render(
    <MemoryRouter>
      <BurgerMenu open={false} toggleNav={() => {}} />
    </MemoryRouter>,
  );
  expect(screen.getByRole('button')).not.toHaveClass('open');
});
