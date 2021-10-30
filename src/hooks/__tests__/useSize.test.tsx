import { renderHook } from '@testing-library/react-hooks';

import useSize from '../useSize';

test('resize empty element', () => {
  const originalError = console.error;
  const error = jest.fn();
  console.error = error;

  const { result } = renderHook(() => useSize());
  expect(result.current).toStrictEqual([window.innerWidth, window.innerHeight]);

  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 500,
  });
  window.dispatchEvent(new Event('resize'));

  expect(result.current).toStrictEqual([500, window.innerHeight]);

  expect(error).toHaveBeenCalledTimes(1);
  console.error = originalError;
});
