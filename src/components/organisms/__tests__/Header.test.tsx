import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '../../../utils/test-utils';
import Header from '../Header';

test('nav open', async () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
  const navButton = screen.getByRole('button');

  userEvent.click(navButton);
  await waitFor(
    () => expect(screen.getByRole('navigation')).toHaveStyle('height: 100%;'),
    { timeout: 1200 },
  );

  userEvent.click(screen.getByText('Home'));
  await waitFor(
    () => expect(screen.getByRole('navigation')).toHaveStyle('height: 0px;'),
    { timeout: 1200 },
  );
});
