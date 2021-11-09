import { gsap } from 'gsap';

import { screen, render, waitFor } from '../../../utils/test-utils';
import { ImgSingleProp } from '../../../interface';
import picture from '../../../assets/background.jpg';
import WorkDetailParallax from '../components/WorkDetailParallax';

const preview: ImgSingleProp = {
  type: 'mobile',
  url: picture,
  height: 2416,
  width: 2416,
  urls: {},
};

test('is visible', async () => {
  render(<WorkDetailParallax preview={preview} />);
  await waitFor(() =>
    expect(screen.getByTestId('parallax')).toHaveStyle('opacity:1'),
  );
});

test('classname', async () => {
  render(<WorkDetailParallax preview={preview} />);
  await waitFor(() =>
    expect(screen.getByTestId('parallax')).toHaveClass('is-mobile'),
  );
});

test('classname', async () => {
  render(<WorkDetailParallax preview={{ ...preview, type: 'web' }} />);
  await waitFor(() =>
    expect(screen.getByTestId('parallax')).not.toHaveClass('is-mobile'),
  );
});

test('unmount', async () => {
  const kill = jest.fn();
  const spy = jest.spyOn(gsap, 'timeline');
  spy.mockImplementation(
    () => ({ kill, to: jest.fn(), call: jest.fn() } as any),
  );

  const { unmount } = render(
    <WorkDetailParallax preview={{ ...preview, type: 'web' }} />,
  );
  unmount();
  await waitFor(() => expect(kill).toHaveBeenCalled(), {
    timeout: 3000,
  });
});
