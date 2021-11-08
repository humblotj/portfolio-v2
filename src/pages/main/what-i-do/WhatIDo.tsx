import './WhatIDo.scss';
import MobileWebApp from './components/MobileWebApp';

const WhatIDo = () => {
  return (
    <section className="what-i-do-sec">
      <h2 className="heading">What I do</h2>
      <ul>
        <MobileWebApp />
      </ul>
    </section>
  );
};

export default WhatIDo;
