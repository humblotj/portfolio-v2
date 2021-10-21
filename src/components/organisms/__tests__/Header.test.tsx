import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '../../../utils/test-utils';
import Header from '../Header';

test('nav open', async () => {
  render(
    <Router>
      <Header />
    </Router>,
  );
  const navButton = screen.getByRole('button');
  userEvent.click(navButton);
  await waitFor(
    () => expect(screen.getByRole('navigation')).toHaveStyle('opacity:1'),
    { timeout: 1500 },
  );
});
