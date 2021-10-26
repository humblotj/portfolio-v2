import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '../../../utils/test-utils';
import { WorkDetailProps } from '../../../interface';
import { initialState } from '../../../store/store';
import WorkDetail from '../WorkDetail';

const workDetails: WorkDetailProps = {
  repoUrl: 'https://github.com',
  links: {
    web: 'https://github.com',
    ios: 'https://github.com',
    android: 'https://github.com',
  },
  name: 'name',
  description: 'description',
  nextWork: 'jrello',
  previousWork: 'iphone-12',
  index: 10,
  year: 2021,
  techs: ['React', 'Angular'],
  mainPreview: {
    type: 'web',
    url: '',
    height: 2416,
    width: 2416,
    urls: {},
  },
  previews: [] as any,
};

it('renders null', () => {
  const { container } = render(<WorkDetail />, {
    initialState,
  });
  expect(container).toBeEmptyDOMElement();
});

it('renders links', () => {
  render(
    <MemoryRouter>
      <WorkDetail />
    </MemoryRouter>,
    {
      initialState: {
        ...initialState,
        workDetails,
        isInit: true,
      },
    },
  );
  expect(screen.getByTestId('ios')).toBeInTheDocument();
  expect(screen.getByTestId('android')).toBeInTheDocument();
  expect(screen.getByText('Visit Site')).toBeInTheDocument();
  expect(screen.getByText('View Code')).toBeInTheDocument();
});

it('doesnt renders links', () => {
  render(
    <MemoryRouter>
      <WorkDetail />
    </MemoryRouter>,
    {
      initialState: {
        ...initialState,
        workDetails: { ...workDetails, links: {} },
      },
    },
  );
  expect(screen.queryByTestId('ios')).not.toBeInTheDocument();
  expect(screen.queryByTestId('android')).not.toBeInTheDocument();
  expect(screen.queryByText('View Site')).not.toBeInTheDocument();
  expect(screen.getByText('View Code')).toBeInTheDocument();
});
