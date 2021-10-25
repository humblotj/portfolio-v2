import {
  render,
  renderIgnoringGsapWarning,
  screen,
} from '../../../../utils/test-utils';
import { ImgSingleProp } from '../../../../interface';
import picture from '../../../../assets/background.jpg';
import WorkDetailDescription from '../WorkDetailDescription';

const preview: ImgSingleProp = {
  type: 'mobile',
  url: picture,
  height: 2416,
  width: 2416,
  urls: {},
};

it('returns null', () => {
  const { container } = render(<WorkDetailDescription work={null as any} />);
  expect(container).toBeEmptyDOMElement();
});

test('work detail description', () => {
  renderIgnoringGsapWarning(
    <WorkDetailDescription
      work={
        {
          name: 'jrello',
          description: 'jrello description',
          year: 2021,
          techs: ['React', 'Angular'],
          mainPreview: preview,
        } as any
      }
    />,
  );
  expect(screen.getByText('j')).toBeInTheDocument();
  expect(screen.getByText('jrello description')).toBeInTheDocument();
  expect(screen.getByText('2021')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('Angular')).toBeInTheDocument();
});
