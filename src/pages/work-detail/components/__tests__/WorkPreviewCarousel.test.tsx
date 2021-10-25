import { screen, render } from '../../../../utils/test-utils';
import { ImgProp } from '../../../../interface';
import picture from '../../../../assets/background.jpg';
import WorkPreviewCarousel from '../WorkPreviewCarousel';

const previews: ImgProp = {
  type: 'web',
  url: picture,
  height: 2416,
  width: 2416,
  urls: [
    { 2416: picture },
    { 2416: picture },
    { 2416: picture },
    { 2416: picture },
  ],
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

test('phone carousel', () => {
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

  expect(screen.queryAllByAltText('mockup')).toHaveLength(4);
});

test('phone carousel', () => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 500,
  });

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

  expect(screen.queryAllByAltText('mockup')).toHaveLength(4);
});
