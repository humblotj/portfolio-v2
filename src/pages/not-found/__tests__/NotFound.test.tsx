import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

import { render } from '../../../utils/test-utils';
import NotFound from '../NotFound';

test('Not Found', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  expect(screen.getByText('Turn Back Home')).toBeInTheDocument();
});
