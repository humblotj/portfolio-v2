import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';

test('Not Found', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  expect(screen.getByText('Turn Back Home')).toBeInTheDocument();
});
