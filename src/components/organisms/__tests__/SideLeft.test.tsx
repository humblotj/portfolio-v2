import { render, screen } from '@testing-library/react';
import SideLeft from '../SideLeft';

it('has links', () => {
  render(<SideLeft />);
  expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  expect(screen.getByLabelText('Github')).toBeInTheDocument();
  expect(screen.getByLabelText('Codepen')).toBeInTheDocument();
});
