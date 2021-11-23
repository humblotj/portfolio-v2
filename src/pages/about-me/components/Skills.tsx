import { useEffect, useRef, memo } from 'react';

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
import { ReactComponent as Java } from '../../../assets/icons/java.svg';
import { ReactComponent as Flutter } from '../../../assets/icons/flutter.svg';
import { ReactComponent as GraphQL } from '../../../assets/icons/graphql.svg';
import { ReactComponent as D3js } from '../../../assets/icons/d3js.svg';
import { ReactComponent as Webpack } from '../../../assets/icons/webpack.svg';
import { ReactComponent as Swift } from '../../../assets/icons/swift.svg';
import { ReactComponent as Kotlin } from '../../../assets/icons/kotlin.svg';
import Bounce from '../../../components/atoms/Bounce';
import CloseButton from '../../../components/atoms/CloseButton';
import useAnimation from '../../../hooks/useAnimation';

type SkillType = {
  name: string;
  component: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: string;
}[];

const proficientSkills = [
  { name: 'React', component: ReactJS },
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

const familiarSkills = [
  { name: 'Vue.js', component: VueJs, size: 'medium' },
  { name: 'Next.js', component: NextJS, size: 'medium' },
  { name: 'Gsap', component: Gsap },
  { name: 'Lottie', component: Lottie, size: 'medium' },
  { name: 'Node.js', component: NodeJs },
  { name: 'MongoDB', component: MongoDB },
  { name: 'Jest', component: Jest, size: 'medium' },
  { name: 'Testing Library', component: TestingLibrary },
  { name: 'Babel', component: Babel },
  { name: 'Socket.io', component: SocketIO },
  { name: 'Java', component: Java },
];

const wantToLearnSkills = [
  { name: 'Flutter', component: Flutter },
  { name: 'GraphQL', component: GraphQL },
  { name: 'D3.js', component: D3js, size: 'medium' },
  { name: 'Webpack', component: Webpack },
  { name: 'Swift', component: Swift },
  { name: 'Kotlin', component: Kotlin, size: 'medium' },
];

interface SkillProp {
  title: string;
  skills: SkillType;
}

// eslint-disable-next-line react/display-name
const Skill: React.FC<SkillProp> = memo(({ title, skills }) => (
  <dl>
    <dt>
      <div className="reveal">
        <h3 className="reveal-text">{title}</h3>
        <div className="reveal-mask" aria-hidden />
      </div>
    </dt>
    <dd>
      <ul>
        {skills.map(({ name, component, size }) => {
          const Logo = component;
          return (
            <li className={size} key={name}>
              <Bounce>
                <Logo />
              </Bounce>
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </dd>
  </dl>
));

interface SkillsProp {
  closeContactModal: () => void;
  aboutAnimationDone: boolean;
}
const Skills: React.FC<SkillsProp> = ({
  closeContactModal,
  aboutAnimationDone,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { revealText } = useAnimation();

  useEffect(() => {
    if (aboutAnimationDone) {
      const element = ref.current!;

      const reveal = element.querySelectorAll('.reveal');
      const skillsLists = element.querySelectorAll('ul');

      for (let i = 0; i < reveal.length; i++) {
        const tl = revealText(reveal[i], {
          delay: i * 0.12,
          trigger: reveal[i],
          scroller: document.querySelector('.modal-content'),
        });

        tl.to(
          skillsLists[i].querySelectorAll('li'),
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            stagger: 0.2,
          },
          '<0.2',
        );
      }
    }
  }, [aboutAnimationDone]);

  return (
    <div ref={ref} className="skills" data-testid="skills">
      <CloseButton onClick={closeContactModal} />
      <h2>Skills</h2>
      <div className="skills-content">
        <Skill title="Proficient in:" skills={proficientSkills} />
        <Skill title="Familiar with:" skills={familiarSkills} />
        <Skill title="Learning:" skills={wantToLearnSkills} />
      </div>
    </div>
  );
};

export default memo(Skills);
