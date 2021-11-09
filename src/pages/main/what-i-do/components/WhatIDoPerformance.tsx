import './WhatIDoPerformance.scss';
import Lighthouse from '../../../../assets/lighthouse-1600.png';

const WhatIDoPerformance = () => {
  return (
    <li className="what-i-do-performance">
      <h3>
        Highly
        <br />
        Performant
      </h3>
      <img src={Lighthouse} alt="lighthouse" />
    </li>
  );
};

export default WhatIDoPerformance;
