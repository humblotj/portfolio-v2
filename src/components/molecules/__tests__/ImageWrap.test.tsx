import videoTest from 'assets/video-test.mp4';
import { ImgSingleProp } from 'interface';
import {
  renderIgnoringUnstableFlushDiscreteUpdates,
  screen,
} from 'utils/test-utils';
import ImageWrap from '../ImageWrap';

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
