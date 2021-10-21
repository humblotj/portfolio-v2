import { render } from '@testing-library/react';
import WorkDetailDescription from '../WorkDetailDescription';

it('returns null', () => {
  const { container } = render(<WorkDetailDescription work={null as any} />);
  expect(container).toBeEmptyDOMElement();
});
