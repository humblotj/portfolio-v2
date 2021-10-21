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

it('returns svg', () => {
  const { container } = render(<TechIcon name="React Native" />);
  expect(container.innerHTML).toBe('<svg>react-native.svg</svg>');
});

it('returns svg', () => {
  const { container } = render(<TechIcon name="Redux" />);
  expect(container.innerHTML).toBe('<svg>redux.svg</svg>');
});

it('returns svg', () => {
  const { container } = render(<TechIcon name="Angular" />);
  expect(container.innerHTML).toBe('<svg>angular.svg</svg>');
});

it('returns svg', () => {
  const { container } = render(<TechIcon name="NgRx" />);
  expect(container.innerHTML).toBe('<svg>ngrx.svg</svg>');
});

it('returns svg', () => {
  const { container } = render(<TechIcon name="TypeScript" />);
  expect(container.innerHTML).toBe('<svg>typescript.svg</svg>');
});

it('returns svg', () => {
  const { container } = render(<TechIcon name="Vue.js" />);
  expect(container.innerHTML).toBe('<svg>vuejs.svg</svg>');
});

it('returns svg', () => {
  const { container } = render(<TechIcon name="Gsap" />);
  expect(container.innerHTML).toBe('<svg>gsap.svg</svg>');
});

it('returns svg', () => {
  const { container } = render(<TechIcon name="Node.js" />);
  expect(container.innerHTML).toBe('<svg>nodejs.svg</svg>');
});

it('returns svg', () => {
  const { container } = render(<TechIcon name="Spring" />);
  expect(container.innerHTML).toBe('<svg>spring.svg</svg>');
});

it('returns svg', () => {
  const { container } = render(<TechIcon name="Next.js" />);
  expect(container.innerHTML).toBe('<svg color="#000">nextjs.svg</svg>');
});
