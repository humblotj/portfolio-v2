import { render, screen, waitFor } from '@testing-library/react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { ImgSingleProp } from '../../../interface';
import Phone from '../Phone';
import picture from '../../../assets/background.jpg';
import videoTest from '../../../assets/video-test.mp4';
import { renderIgnoringUnstableFlushDiscreteUpdates } from '../../../utils/test-utils';

const preview: ImgSingleProp = {
  type: 'mobile',
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
  render(<Phone preview={preview} noAnimation />);
  expect(screen.getByTestId('overlay')).not.toBeVisible();
});

it('starts animation', async () => {
  render(<Phone preview={preview} startAnimation />);
  expect(screen.getByTestId('overlay')).toBeVisible();
  await waitFor(() => expect(screen.getByTestId('overlay')).not.toBeVisible());
});

it('plays video', async () => {
  const play = jest
    .spyOn(window.HTMLMediaElement.prototype, 'play')
    .mockImplementation(() => new Promise((resolve) => resolve()));

  renderIgnoringUnstableFlushDiscreteUpdates(
    <Phone preview={previewVideo} noAnimation />,
  );
  await waitFor(() => expect(play).toHaveBeenCalled(), { timeout: 3000 });
  play.mockRestore();
});

it('plays video', async () => {
  const play = jest
    .spyOn(window.HTMLMediaElement.prototype, 'play')
    .mockImplementation(() => new Promise((resolve) => resolve()));

  const { rerender } = renderIgnoringUnstableFlushDiscreteUpdates(
    <Phone preview={previewVideo} startAnimation={false} />,
  );
  rerender(<Phone preview={previewVideo} startAnimation />);
  await waitFor(() => expect(play).toHaveBeenCalled(), { timeout: 3000 });
  play.mockRestore();
});
