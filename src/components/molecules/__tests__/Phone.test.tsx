import { render, screen, waitFor } from '@testing-library/react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { ImgSingleProp } from '../../../interface';
import Phone from '../Phone';
import picture from '../../../assets/background.jpg';

const preview: ImgSingleProp = {
  type: 'mobile',
  url: picture,
  height: 2416,
  width: 2416,
  urls: {},
};

it('is opened', async () => {
  render(<Phone preview={preview} noAnimation />);
  expect(screen.getByTestId('overlay')).not.toBeVisible();
});

it('starts animation', async () => {
  render(<Phone preview={preview} startAnimation />);
  expect(screen.getByTestId('overlay')).toBeVisible();
  await waitFor(() => expect(screen.getByTestId('overlay')).not.toBeVisible());
});
