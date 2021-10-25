import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import WorkDetailFooter from '../components/WorkDetailFooter';

test('work details footer', () => {
  render(
    <MemoryRouter>
      <WorkDetailFooter
        work={
          { nextWork: 'jrello', previousWork: 'iphone-12', index: 10 } as any
        }
      />
    </MemoryRouter>,
  );
  expect(screen.getByText('jrello')).toBeInTheDocument();
  expect(screen.getByText('iphone-12')).toBeInTheDocument();
  expect(screen.getByText('1/10')).toBeInTheDocument();
});

test('work details footer', () => {
  render(
    <MemoryRouter>
      <WorkDetailFooter
        work={{ nextWork: '', previousWork: 'iphone-12', index: 10 } as any}
      />
    </MemoryRouter>,
  );
  expect(screen.getByText('iphone-12')).toBeInTheDocument();
  expect(screen.getByText('1/10')).toBeInTheDocument();
});
