import { screen, render } from '@testing-library/react';

import picture from '../../../../assets/background.jpg';
import { ImgProp } from '../../../../interface';
import WorkPreviewCarousel from '../WorkPreviewCarousel';

const previews: ImgProp = {
  type: 'web',
  url: picture,
  height: 2416,
  width: 2416,
  urls: [{ 2416: picture }],
};

test('web carousel', () => {
  render(
    <WorkPreviewCarousel
      work={
        {
          name: 'jrello',
          previews,
        } as any
      }
    />,
  );

  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('web carousel', () => {
  render(
    <WorkPreviewCarousel
      work={
        {
          name: 'jrello',
          previews: { ...previews, type: 'mobile' },
        } as any
      }
    />,
  );

  expect(screen.getByAltText('mockup')).toBeInTheDocument();
});
