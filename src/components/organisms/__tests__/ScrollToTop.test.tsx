import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';

it('triggers pagehide', () => {
  window.scrollTo = jest.fn();
  render(
    <MemoryRouter>
      <ScrollToTop />
    </MemoryRouter>,
  );
  fireEvent.scroll(window, { target: { scrollY: 100 } });
  expect(window.scrollY).toEqual(100);
  window.dispatchEvent(new Event('pagehide'));
  expect(window.scrollTo).toHaveBeenCalled();
});
