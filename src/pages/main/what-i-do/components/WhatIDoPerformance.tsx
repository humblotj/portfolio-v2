import './WhatIDoPerformance.scss';
import Lighthouse300 from '../../../../assets/lighthouse-300.png';
import Lighthouse550 from '../../../../assets/lighthouse-550.png';
import Lighthouse800 from '../../../../assets/lighthouse-800.png';
import Lighthouse1200 from '../../../../assets/lighthouse-1200.png';
import Lighthouse1600 from '../../../../assets/lighthouse-1600.png';

const WhatIDoPerformance = () => {
  return (
    <li className="what-i-do-performance">
      <h3 className="heading">
        Highly
        <br />
        Performant
      </h3>
      <img
        data-src={Lighthouse1600}
        data-srcSet={`${Lighthouse300} 300w, ${Lighthouse550} 550w, ${Lighthouse800} 800w, ${Lighthouse1200} 1200w, ${Lighthouse1600} 1600w,`}
        alt="lighthouse"
        className="lazyload"
      />
    </li>
  );
};

export default WhatIDoPerformance;
