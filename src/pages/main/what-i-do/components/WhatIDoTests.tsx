import './WhatIDoTests.scss';
import Coverage from '../../../../assets/coverage-800.jpg';

const WhatIDoTests = () => {
  return (
    <li className="what-i-do-tests">
      <div>
        <h3 className="heading">Reliable</h3>
        <p>Use of automated tests to ensure high-quality code</p>
      </div>
      <img data-src={Coverage} alt="coverage" className="lazyload" />
    </li>
  );
};

export default WhatIDoTests;
