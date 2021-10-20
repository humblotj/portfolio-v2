import { fireEvent, render, screen } from '@testing-library/react';
import FakeLink from '../FakeLink';

it('has class custom-class', () => {
  render(<FakeLink className="custom-class">FakeLink</FakeLink>);
  expect(screen.getByText('FakeLink')).toHaveClass('custom-class');
});

it('prevents default click event', () => {
  render(<FakeLink className="custom-class">FakeLink</FakeLink>);
  const fakelink = screen.getByText('FakeLink');
  expect(fireEvent.click(fakelink)).toBe(false);
});
