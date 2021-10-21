import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '../../../utils/test-utils';
import Loading from '../Loading';

test('counter', async () => {
  render(
    <Router>
      <Loading />{' '}
    </Router>,
  );
  expect(screen.getByText('0')).toBeInTheDocument();
  await screen.findByText('99');
});
