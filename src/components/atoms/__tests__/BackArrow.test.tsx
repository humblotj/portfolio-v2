import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BackArrow from '../BackArrow';

it('has class custom-class', () => {
  render(
    <Router>
      <BackArrow className="custom-class" direction="right" />
    </Router>,
  );
  expect(screen.getByRole('link')).toHaveClass('custom-class');
  expect(screen.getByRole('link')).toHaveClass('right');
});

it('is disabled', () => {
  render(
    <Router>
      <BackArrow disabled />
    </Router>,
  );
  expect(screen.getByRole('link')).toHaveClass('disabled');
});
