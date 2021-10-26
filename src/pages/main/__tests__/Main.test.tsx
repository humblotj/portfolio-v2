import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '../../../utils/test-utils';
import Main from '../Main';

test('renders 2 work items', () => {
  render(
    <MemoryRouter>
      <Main />
    </MemoryRouter>,
  );
  expect(screen.getByText('Contact')).toBeInTheDocument();
});
