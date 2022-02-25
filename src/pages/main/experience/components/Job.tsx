import './Job.scss';

import { IJob } from 'interface';

const Job = ({ logo, companyName, position, period, bullets }: IJob) => {
  return (
    <li className="job">
      <img data-src={logo} alt={companyName} className="lazyload" />
      <div>
        <h3>{position}</h3>
        <p>{companyName}</p>
        <span>{period}</span>
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Job;
