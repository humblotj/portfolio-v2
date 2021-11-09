import { forwardRef } from 'react';

import './WhatIDo.scss';
import WhatIDoIntro from './components/WhatIDoIntro';
import WhatIDoPerformance from './components/WhatIDoPerformance';
import WhatIDoAnimations from './components/WhatIDoAnimations';
import WhatIDoTests from './components/WhatIDoTests';
import WhatIDoFast from './components/WhatIDoFast';

const WhatIDo = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="what-i-do-sec">
      <h2 className="heading">What I do</h2>
      <ul>
        <WhatIDoIntro />
        <WhatIDoPerformance />
        <WhatIDoAnimations />
        <WhatIDoTests />
        <WhatIDoFast />
      </ul>
    </section>
  );
});

WhatIDo.displayName = 'WhatIDo';

export default WhatIDo;
