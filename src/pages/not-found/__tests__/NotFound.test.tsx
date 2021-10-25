import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

import { renderIgnoringGsapWarning } from '../../../utils/test-utils';
import NotFound from '../NotFound';

test('Not Found', () => {
  renderIgnoringGsapWarning(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  expect(screen.getByText('Turn Back Home')).toBeInTheDocument();
});
