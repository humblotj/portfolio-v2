import React, {
  useEffect, useRef, useState, memo,
} from 'react';

import './Skills.scss';
import { ReactComponent as ReactJS } from '../../../assets/icons/react.svg';
import { ReactComponent as ReactNative } from '../../../assets/icons/react-native.svg';
import { ReactComponent as Redux } from '../../../assets/icons/redux.svg';
import { ReactComponent as Angular } from '../../../assets/icons/angular.svg';
import { ReactComponent as NgRx } from '../../../assets/icons/ngrx.svg';
import { ReactComponent as RxJs } from '../../../assets/icons/rxjs.svg';
import { ReactComponent as TypeScript } from '../../../assets/icons/typescript.svg';
import { ReactComponent as ES6 } from '../../../assets/icons/es6.svg';
import { ReactComponent as Sass } from '../../../assets/icons/sass.svg';
import { ReactComponent as Firebase } from '../../../assets/icons/firebase.svg';
import { ReactComponent as VueJs } from '../../../assets/icons/vuejs.svg';
import { ReactComponent as NextJS } from '../../../assets/icons/nextjs.svg';
import { ReactComponent as Gsap } from '../../../assets/icons/gsap.svg';
import { ReactComponent as Lottie } from '../../../assets/icons/lottie.svg';
import { ReactComponent as NodeJs } from '../../../assets/icons/nodejs.svg';
import { ReactComponent as MongoDB } from '../../../assets/icons/mongodb.svg';
import { ReactComponent as Jest } from '../../../assets/icons/jest.svg';
import { ReactComponent as TestingLibrary } from '../../../assets/icons/testing-library.svg';
import { ReactComponent as Babel } from '../../../assets/icons/babel.svg';
import { ReactComponent as SocketIO } from '../../../assets/icons/socket-io.svg';
import { ReactComponent as Pwa } from '../../../assets/icons/pwa.svg';
import { ReactComponent as Java } from '../../../assets/icons/java.svg';
import { ReactComponent as Flutter } from '../../../assets/icons/flutter.svg';
import { ReactComponent as GraphQL } from '../../../assets/icons/graphql.svg';
import { ReactComponent as D3js } from '../../../assets/icons/d3js.svg';
import { ReactComponent as Webpack } from '../../../assets/icons/webpack.svg';
import { ReactComponent as WebGL } from '../../../assets/icons/webgl.svg';
import Bounce from '../../../components/ui/Bounce';
import CloseButton from '../../../components/ui/CloseButton';
import useSize from '../../../hooks/useSize';
import useAnimation from '../../../hooks/useAnimation';

type skillType = ({
  name: string;
  component: React.FunctionComponent<any>;
  size?: string;
})[];

const proficientSkills = [{ name: 'React', component: ReactJS },
  { name: 'React Native', component: ReactNative },
  { name: 'Redux', component: Redux },
  { name: 'Angular', component: Angular },
  { name: 'NgRx', component: NgRx },
  { name: 'RxJS', component: RxJs },
  { name: 'TypeScript', component: TypeScript, size: 'medium' },
  { name: 'ES6', component: ES6, size: 'medium' },
  { name: 'Sass', component: Sass, size: 'medium' },
  { name: 'Firebase', component: Firebase },
];

const familiarSkills = [{ name: 'Vue.js', component: VueJs, size: 'medium' },
  { name: 'Next.js', component: NextJS, size: 'medium' },
  { name: 'Gsap', component: Gsap },
  { name: 'Lottie', component: Lottie, size: 'medium' },
  { name: 'Node.js', component: NodeJs },
  { name: 'MongoDB', component: MongoDB },
  { name: 'Jest', component: Jest, size: 'medium' },
  { name: 'Testing Library', component: TestingLibrary },
  { name: 'Babel', component: Babel },
  { name: 'Socket.io', component: SocketIO },
  { name: 'PWA', component: Pwa },
  { name: 'Java', component: Java },
];

const wantToLearnSkills = [{ name: 'Flutter', component: Flutter },
  { name: 'GraphQL', component: GraphQL },
  { name: 'D3.js', component: D3js, size: 'medium' },
  { name: 'Webpack', component: Webpack },
  { name: 'WebGL', component: WebGL },
];

const Skill = memo(({ title, skills }: {title: string, skills: skillType}) => (
  <dl>
    <dt>
      <div className="reveal">
        <h3 className="reveal-text">
          {title}
        </h3>
        <div className="reveal-mask" aria-hidden />
      </div>
    </dt>
    <dd>
      <ul>
        {skills.map(({ name, component, size }) => {
          const Logo = component;
          return (
            <li className={size}>
              <Bounce><Logo /></Bounce>
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </dd>
  </dl>
));

const Skills = ({ closeContactModal }: {closeContactModal: ()=> void}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width] = useSize();
  const { animateReveal } = useAnimation();
  const [isInit, setIsInit] = useState(false);

  useEffect(() => { setTimeout(() => { setIsInit(true); }, 1900); }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !isInit) {
      return;
    }

    const reveal = element.querySelectorAll('.reveal');
    const skillsLists = element.querySelectorAll('ul');

    for (let i = 0; i < reveal.length; i++) {
      const tl = animateReveal(reveal[i], {
        delay: i * 0.12,
        trigger: reveal[i],
        scroller: document.querySelector('.modal-content'),
      });

      const skills = skillsLists[i].querySelectorAll('li');
      for (let j = 0; j < skills.length; j++) {
        tl.to(skills[j], {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, j === 0 ? '<0.4' : '<0.2');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, isInit]);

  return (
    <div ref={ref} className="skills">
      <CloseButton onClick={closeContactModal} />
      <h2>Skills</h2>
      <div className="skills-content">
        <Skill title="Proficient in:" skills={proficientSkills} />
        <Skill title="Familiar with:" skills={familiarSkills} />
        <Skill title="Want to learn:" skills={wantToLearnSkills} />
      </div>
    </div>
  );
};

export default memo(Skills);
