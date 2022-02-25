import { MemoryRouter } from 'react-router-dom';

import { WorkProps } from 'interface';
import { initialState } from 'store/store';
import { render, screen } from 'utils/test-utils';
import Work from '../Work';

const works: WorkProps[] = [
  {
    isPersonal: true,
    name: 'name1',
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
  },
  {
    isPersonal: true,
    name: 'name2',
    description: 'description',
    techs: ['React', 'Angular'],
    preview: {
      type: 'web',
      url: '',
      height: 2416,
      width: 2416,
      urls: [],
    },
    order: 2,
  },
];

it('renders 2 work items', () => {
  render(
    <MemoryRouter>
      <Work />
    </MemoryRouter>,
    {
      initialState: { ...initialState, works },
    },
  );
  expect(screen.queryAllByText('Personal Work')).toHaveLength(2);
});
