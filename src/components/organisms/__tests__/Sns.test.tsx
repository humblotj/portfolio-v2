import { render, screen } from '@testing-library/react';
import Sns from '../Sns';

it('has links', () => {
  render(<Sns />);
  expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  expect(screen.getByLabelText('Github')).toBeInTheDocument();
  expect(screen.getByLabelText('Codepen')).toBeInTheDocument();
});
