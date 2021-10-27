import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { initialState } from '../../../store/store';

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

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

it('scrolls to work', () => {
  const history = createMemoryHistory();
  const state = 'work';
  history.push('/', state);

  render(
    <Router history={history}>
      <Main />
    </Router>,
    { initialState: { ...initialState, isInit: true } },
  );
  expect(scrollIntoViewMock).toBeCalled();
});

it('scrolls to contact', () => {
  const history = createMemoryHistory();
  const state = 'contact';
  history.push('/', state);

  render(
    <Router history={history}>
      <Main />
    </Router>,
    { initialState: { ...initialState, isInit: true } },
  );
  expect(scrollIntoViewMock).toBeCalled();
});
