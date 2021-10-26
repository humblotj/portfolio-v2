import { ImgSingleProp } from '../../../interface';
import Laptop from '../Laptop';
import picture from '../../../assets/background.jpg';
import videoTest from '../../../assets/video-test.mp4';
import {
  renderIgnoringUnstableFlushDiscreteUpdates,
  render,
  screen,
  waitFor,
} from '../../../utils/test-utils';

const preview: ImgSingleProp = {
  type: 'web',
  url: picture,
  height: 2416,
  width: 2416,
  urls: {},
};

const previewVideo: ImgSingleProp = {
  type: 'web',
  isVideo: true,
  url: videoTest,
  height: 2416,
  width: 2416,
  urls: { 2416: videoTest, 2400: videoTest },
};

it('is opened', () => {
  render(<Laptop preview={preview} noAnimation />);
  expect(screen.getByTestId('top')).toHaveStyle('transform: translate(0, 0)');
});

it('starts animation', async () => {
  render(<Laptop preview={preview} />);
  await waitFor(
    () =>
      expect(screen.getByTestId('top')).not.toHaveStyle(
        'transform: translate(0, 0)',
      ),
    { timeout: 1200 },
  );
});

it('plays video', async () => {
  const play = jest
    .spyOn(window.HTMLMediaElement.prototype, 'play')
    .mockImplementation(() => new Promise((resolve) => resolve()));

  renderIgnoringUnstableFlushDiscreteUpdates(
    <Laptop preview={previewVideo} noAnimation />,
  );
  await waitFor(() => expect(play).toHaveBeenCalled(), { timeout: 3000 });
  play.mockRestore();
});

it('plays video', async () => {
  const play = jest
    .spyOn(window.HTMLMediaElement.prototype, 'play')
    .mockImplementation(() => new Promise((resolve) => resolve()));

  const { rerender } = renderIgnoringUnstableFlushDiscreteUpdates(
    <Laptop preview={previewVideo} startAnimation={false} />,
  );
  rerender(<Laptop preview={previewVideo} startAnimation={true} />);
  rerender(<Laptop preview={previewVideo} startAnimation={true} />);
  await waitFor(() => expect(play).toHaveBeenCalled(), { timeout: 3000 });
  play.mockRestore();
});

test('picture', () => {
  const play = jest
    .spyOn(window.HTMLMediaElement.prototype, 'play')
    .mockImplementation(() => new Promise((resolve) => resolve()));

  const { rerender } = render(
    <Laptop preview={preview} startAnimation={false} />,
  );
  rerender(<Laptop preview={preview} startAnimation />);
  expect(play).not.toHaveBeenCalled();
  play.mockRestore();
});
