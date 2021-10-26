import { render, screen } from '../../../utils/test-utils';
import { initialState } from '../../../store/store';
import WorkDetail from '../WorkDetail';
import WorkDetailLinks from '../components/WorkDetailLinks';
import userEvent from '@testing-library/user-event';

const work = {
  repoUrl: 'https://github.com',
  links: {
    web: 'https://github.com',
    ios: 'https://github.com',
    android: 'https://github.com',
  },
};

it('renders null', () => {
  const { container } = render(<WorkDetail />, {
    initialState,
  });
  expect(container).toBeEmptyDOMElement();
});

test('renders links', () => {
  render(<WorkDetailLinks work={work as any} />);
  expect(screen.getByTestId('ios')).toBeInTheDocument();
  expect(screen.getByTestId('android')).toBeInTheDocument();
  expect(screen.getByText('Visit Site')).toBeInTheDocument();
  expect(screen.getByText('View Code')).toBeInTheDocument();

  const visitSite = screen.getByText('Visit Site');
  userEvent.click(visitSite);
  const viewCode = screen.getByText('View Code');
  userEvent.click(viewCode);
});

test('renders links', () => {
  window.open = jest.fn();
  render(<WorkDetailLinks work={{ ...work, links: {} } as any} />);

  expect(screen.queryByTestId('ios')).not.toBeInTheDocument();
  expect(screen.queryByTestId('android')).not.toBeInTheDocument();
  expect(screen.queryByText('Visit Site')).not.toBeInTheDocument();
  expect(screen.getByText('View Code')).toBeInTheDocument();

  const viewCode = screen.getByText('View Code');
  userEvent.click(viewCode);
  expect(window.open).toHaveBeenCalled();
});

test('renders links', () => {
  render(
    <WorkDetailLinks
      work={
        {
          ...work,
          links: {
            ios: 'https://github.com',
            android: 'https://github.com',
          },
        } as any
      }
    />,
  );

  expect(screen.getByTestId('ios')).toBeInTheDocument();
  expect(screen.getByTestId('android')).toBeInTheDocument();
  expect(screen.queryByText('Visit Site')).not.toBeInTheDocument();
  expect(screen.getByText('View Code')).toBeInTheDocument();
});

test('renders links', () => {
  render(
    <WorkDetailLinks
      work={
        {
          ...work,
          links: {
            web: 'https://github.com',
          },
          repoUrl: '',
        } as any
      }
    />,
  );

  expect(screen.queryByTestId('ios')).not.toBeInTheDocument();
  expect(screen.queryByTestId('android')).not.toBeInTheDocument();
  expect(screen.getByText('Visit Site')).toBeInTheDocument();
  expect(screen.queryByText('View Code')).not.toBeInTheDocument();
});

test('renders links', () => {
  render(
    <WorkDetailLinks
      work={
        {
          ...work,
          links: null,
        } as any
      }
    />,
  );
  expect(screen.queryByText('Visit Site')).not.toBeInTheDocument();
});
