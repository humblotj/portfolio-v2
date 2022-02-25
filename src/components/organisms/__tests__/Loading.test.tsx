import { MemoryRouter } from 'react-router-dom';

import { initialState } from 'store/store';
import { render, screen } from 'utils/test-utils';
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
      <MemoryRouter>
        <Loading />
      </MemoryRouter>,
    );
    expect(screen.getByText('0')).toBeInTheDocument();
    await screen.findByText('99');
  });

  it('doesnt show counter', () => {
    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>,
      { initialState: { ...initialState, isInit: true } },
    );
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('has dark background', () => {
    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>,
    );
    expect(screen.queryByTestId('loading')).toHaveStyle('background: #23282a');
  });

  it('has light background', () => {
    render(
      <MemoryRouter initialEntries={['/other']}>
        <Loading />
      </MemoryRouter>,
    );
    expect(screen.queryByTestId('loading')).toHaveStyle('background: #fff');
  });
});
