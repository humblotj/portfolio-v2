import { render, screen, waitFor } from '@testing-library/react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { ImgSingleProp } from '../../../interface';
import Laptop from '../Laptop';
import picture from '../../../assets/background.jpg';

const preview: ImgSingleProp = {
  type: 'web',
  url: picture,
  height: 2416,
  width: 2416,
  urls: {},
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
