import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '../../../utils/test-utils';
import Loading from '../Loading';

describe('loading', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
      get() {
        return this.textContent;
      },
      set(text: string) {
        this.textContent = text;
      },
    });
  });

  test('counter', async () => {
    render(
      <Router>
        <Loading />{' '}
      </Router>,
    );
    expect(screen.getByText('0')).toBeInTheDocument();
    await screen.findByText('99');
  });
});
