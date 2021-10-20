import { render } from '@testing-library/react';
import TechIcon from '../TechIcon';

it('returns null', () => {
  const { container } = render(<TechIcon name="" />);
  expect(container).toBeEmptyDOMElement();
});

it('returns null', () => {
  const { container } = render(<TechIcon name="random" />);
  expect(container).toBeEmptyDOMElement();
});

it('returns svg', () => {
  const { container } = render(<TechIcon name="React" />);
  expect(container.innerHTML).toBe('<svg>react.svg</svg>');
});
