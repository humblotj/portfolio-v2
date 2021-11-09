import './WhatIDoTests.scss';
import Coverage300 from '../../../../assets/coverage-300.jpg';
import Coverage550 from '../../../../assets/coverage-550.jpg';
import Coverage800 from '../../../../assets/coverage-800.jpg';

const WhatIDoTests = () => {
  return (
    <li className="what-i-do-tests">
      <div>
        <h3 className="heading">Reliable</h3>
        <p>Use of automated tests to ensure high-quality code</p>
      </div>
      <img
        data-src={Coverage800}
        data-srcSet={`${Coverage300} 300w, ${Coverage550} 550w, ${Coverage800} 800w`}
        alt="coverage"
        className="lazyload"
      />
    </li>
  );
};

export default WhatIDoTests;
