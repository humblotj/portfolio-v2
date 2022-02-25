import picture from 'assets/background.jpg';
import videoTest from 'assets/video-test.mp4';
import { ImgSingleProp } from 'interface';
import {
  render,
  renderIgnoringUnstableFlushDiscreteUpdates,
  screen,
} from 'utils/test-utils';
import ImageCrop from '../ImageCrop';

const preview: ImgSingleProp = {
  type: 'web',
  url: picture,
  isParallax: true,
  height: 2416,
  width: 2416,
  urls: { 2416: picture, 200: picture },
};

const previewVideo: ImgSingleProp = {
  type: 'web',
  isVideo: true,
  url: videoTest,
  height: 2416,
  width: 2416,
  urls: { 2416: videoTest, 200: videoTest, 50: videoTest, 25: videoTest },
};

jest.mock('../../../hooks/useSize.tsx', () => ({
  __esModule: true,
  default: () => [100, 100],
}));

describe('test image crop', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('image', () => {
    render(<ImageCrop preview={preview} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('lazyload', () => {
    render(<ImageCrop preview={preview} lazyload />);
    expect(screen.getByRole('img')).toHaveClass('lazyload');
  });

  test('play video', () => {
    const play = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => new Promise((resolve) => resolve()));

    renderIgnoringUnstableFlushDiscreteUpdates(
      <ImageCrop preview={previewVideo} canPlay />,
    );
    expect(play).toHaveBeenCalled();
    play.mockRestore();
  });

  test('video is not playing', () => {
    const play = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => new Promise((resolve) => resolve()));

    renderIgnoringUnstableFlushDiscreteUpdates(
      <ImageCrop preview={previewVideo} />,
    );
    expect(play).not.toHaveBeenCalled();
    play.mockRestore();
  });

  test('video is laying', () => {
    const play = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(undefined);

    renderIgnoringUnstableFlushDiscreteUpdates(
      <ImageCrop preview={previewVideo} canPlay />,
    );
    expect(play).toHaveBeenCalled();
    play.mockRestore();
  });
});
