import { waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '../../../utils/test-utils';
import Nav from '../Nav';

test('is open', async () => {
  render(
    <Router>
      <Nav open onClose={() => {}} />
    </Router>,
  );
  await waitFor(() =>
    expect(screen.getByRole('navigation')).toHaveStyle('opacity:1'),
  );
});

test('is close', async () => {
  render(
    <Router>
      <Nav open={false} onClose={() => {}} />
    </Router>,
  );
  expect(screen.getByRole('navigation')).not.toHaveStyle('opacity:1');
});
