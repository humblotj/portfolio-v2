import { screen } from '@testing-library/react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { ImgSingleProp } from '../../../interface';
import ImageWrap from '../ImageWrap';
import videoTest from '../../../assets/video-test.mp4';
import { renderIgnoringUnstableFlushDiscreteUpdates } from '../../../utils/test-utils';

const preview: ImgSingleProp = {
  type: 'web',
  isVideo: true,
  url: videoTest,
  height: 2416,
  width: 2416,
  urls: { 2416: videoTest, 2400: videoTest },
};

it('is laptop', () => {
  renderIgnoringUnstableFlushDiscreteUpdates(<ImageWrap preview={preview} />);
  expect(screen.getByTestId('top')).toBeInTheDocument();
});

it('is not laptop', () => {
  renderIgnoringUnstableFlushDiscreteUpdates(
    <ImageWrap preview={{ ...preview, type: 'mobile' }} />,
  );
  expect(screen.queryByTestId('top')).not.toBeInTheDocument();
});
