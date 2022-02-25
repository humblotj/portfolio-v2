import { render, screen } from '@testing-library/react';

import Strokes from '../Strokes';

it('is secondary', () => {
  render(<Strokes secondary />);
  expect(screen.getByTestId('strokes')).toHaveClass('secondary');
});
