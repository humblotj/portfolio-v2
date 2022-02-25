import { render, screen } from '@testing-library/react';

import ScrollTo from '../ScrollTo';

test('scroll to', () => {
  render(<ScrollTo onClick={() => {}}>Scroll</ScrollTo>);
  expect(screen.getByText('Scroll')).toBeInTheDocument();
});
