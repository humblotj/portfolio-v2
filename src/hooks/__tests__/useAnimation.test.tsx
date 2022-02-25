import { act, renderHook } from '@testing-library/react-hooks';

import useAnimation from '../useAnimation';

test('empty element', () => {
  const { result } = renderHook(() => useAnimation());

  act(() => {
    result.current.revealText(null);
  });
});
