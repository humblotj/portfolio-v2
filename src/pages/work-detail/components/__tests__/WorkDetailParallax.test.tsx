import { screen, render, waitFor } from '../../../../utils/test-utils';
import { ImgSingleProp } from '../../../../interface';
import picture from '../../../../assets/background.jpg';
import WorkDetailParallax from '../WorkDetailParallax';

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
