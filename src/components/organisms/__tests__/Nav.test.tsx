import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { render, screen, setWindowWidth } from 'utils/test-utils';
import AboutMe from '../../../pages/about-me/AboutMe';
import Nav from '../Nav';

test('is open', async () => {
  render(
    <MemoryRouter>
      <Nav open onClose={() => {}} />
    </MemoryRouter>,
  );
  await waitFor(
    () => expect(screen.getByRole('navigation')).toHaveStyle('height: 100%;'),
    { timeout: 2000 },
  );
});

test('is close', () => {
  render(
    <MemoryRouter>
      <Nav open={false} onClose={() => {}} />
    </MemoryRouter>,
  );
  expect(screen.getByRole('navigation')).not.toHaveStyle('height: 100%;');
});

it('opens modal', async () => {
  render(
    <MemoryRouter>
      <Nav open={false} onClose={() => {}} />
      <AboutMe />
    </MemoryRouter>,
  );
  expect(screen.queryByText('Skills')).not.toBeInTheDocument();
  userEvent.click(screen.getByText('About me'));
  await screen.findByText('Skills');
});

test('small width', async () => {
  setWindowWidth(500);

  render(
    <MemoryRouter>
      <Nav open onClose={() => {}} />
    </MemoryRouter>,
  );
  await waitFor(() => expect(document.body).toHaveStyle('overflow: hidden'));
});

test('small width', async () => {
  setWindowWidth(500);

  render(
    <MemoryRouter>
      <Nav open={false} onClose={() => {}} />
    </MemoryRouter>,
  );
  await waitFor(() =>
    expect(document.body).not.toHaveStyle('overflow: hidden'),
  );
});
