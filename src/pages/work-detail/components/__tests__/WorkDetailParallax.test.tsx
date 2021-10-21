import { screen, render, waitFor } from '@testing-library/react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import WorkDetailParallax from '../WorkDetailParallax';
import picture from '../../../../assets/background.jpg';
import { ImgSingleProp } from '../../../../interface';

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
