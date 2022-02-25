import { render, screen } from '@testing-library/react';

import TextBounce from '../TextBounce';

it('is split', () => {
  render(<TextBounce text="Text "></TextBounce>);
  expect(screen.getByText('T')).toBeInTheDocument();
  expect(screen.getByText('e')).toBeInTheDocument();
  expect(screen.getByText('x')).toBeInTheDocument();
  expect(screen.getByText('t')).toBeInTheDocument();
});
