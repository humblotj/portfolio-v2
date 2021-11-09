import './WhatIDoTests.scss';
import Coverage from '../../../../assets/coverage-800.jpg';

const WhatIDoTests = () => {
  return (
    <li className="what-i-do-tests">
      <div>
        <h3>Reliable</h3>
        <p>Use of automated tests to ensure high-quality code</p>
      </div>
      <img src={Coverage} alt="coverage" />
    </li>
  );
};

export default WhatIDoTests;