import { render, screen } from '@testing-library/react';

import Job from '../components/Job';

test('is renders job', () => {
  render(
    <Job
      order={1}
      logo=""
      companyName="companyName"
      position="position"
      period="period"
      bullets={['bullet1', 'bullet2']}
    />,
  );
  expect(screen.getByText('companyName')).toBeInTheDocument();
  expect(screen.getByText('position')).toBeInTheDocument();
  expect(screen.getByText('period')).toBeInTheDocument();
  expect(screen.getByText('bullet1')).toBeInTheDocument();
  expect(screen.getByText('bullet2')).toBeInTheDocument();
});
