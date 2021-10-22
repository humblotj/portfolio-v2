import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BackArrow from '../BackArrow';

it('has class custom-class', () => {
  render(
    <MemoryRouter>
      <BackArrow className="custom-class" direction="right" />
    </MemoryRouter>,
  );
  expect(screen.getByRole('link')).toHaveClass('custom-class');
  expect(screen.getByRole('link')).toHaveClass('right');
});

it('is disabled', () => {
  render(
    <MemoryRouter>
      <BackArrow disabled />
    </MemoryRouter>,
  );
  expect(screen.getByRole('link')).toHaveClass('disabled');
});
