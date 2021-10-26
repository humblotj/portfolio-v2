import { MemoryRouter } from 'react-router-dom';

import { render } from '../../../utils/test-utils';
import NotFoundSuspense from '../NotFoundSuspense';
import { Suspense } from 'react';

test('Not Found', () => {
  render(
    <MemoryRouter>
      <Suspense fallback={<div />}>
        <NotFoundSuspense />
      </Suspense>
    </MemoryRouter>,
  );
});
