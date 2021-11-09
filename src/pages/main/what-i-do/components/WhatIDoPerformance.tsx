import './WhatIDoPerformance.scss';
import Lighthouse from '../../../../assets/lighthouse-1600.png';

const WhatIDoPerformance = () => {
  return (
    <li className="what-i-do-performance">
      <h3 className="heading">
        Highly
        <br />
        Performant
      </h3>
      <img data-src={Lighthouse} alt="lighthouse" className="lazyload" />
    </li>
  );
};

export default WhatIDoPerformance;
