import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

it('has copyright', () => {
  render(<Footer />);
  expect(screen.getByText('© 2021 Jean Humblot')).toBeInTheDocument();
});
