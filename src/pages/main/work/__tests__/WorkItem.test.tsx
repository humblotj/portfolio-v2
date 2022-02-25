import { MemoryRouter } from 'react-router-dom';

import { WorkProps } from 'interface';
import { render, screen, waitFor } from 'utils/test-utils';
import WorkItem from '../components/WorkItem';

const work: WorkProps = {
  isPersonal: true,
  name: 'name',
  description: 'description',
  techs: ['React', 'Angular'],
  preview: {
    type: 'web',
    url: '',
    height: 2416,
    width: 2416,
    urls: [],
  },
  order: 1,
};

test('is visible', async () => {
  render(
    <MemoryRouter>
      <WorkItem index={1} work={work} id="test" />
    </MemoryRouter>,
  );
  await waitFor(
    () => expect(screen.getByText('name')).toHaveStyle('opacity:1'),
    { timeout: 2000 },
  );
  await waitFor(
    () => expect(screen.getByText('description')).toHaveStyle('opacity:1'),
    { timeout: 2000 },
  );
});

test('work item', () => {
  const { rerender } = render(
    <MemoryRouter>
      <WorkItem index={1} work={work} id="test" />
    </MemoryRouter>,
  );
  expect(screen.getByText('Personal Work')).toBeInTheDocument();
  rerender(
    <MemoryRouter>
      <WorkItem index={2} work={{ ...work, isPersonal: false }} id="test2" />
    </MemoryRouter>,
  );
  expect(screen.getByText('Company Work')).toBeInTheDocument();
});
