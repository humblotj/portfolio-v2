import { render, screen } from '@testing-library/react';

import TagList from '../TagList';

it('has techs', () => {
  render(<TagList tags={['React', 'Angular']}></TagList>);
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('Angular')).toBeInTheDocument();
});
