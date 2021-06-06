import { useEffect, useRef } from 'react';
import { gsap, Power2 } from 'gsap';

import './Skills.scss';
import Bounce from '../../../components/ui/Bounce';
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
import { ReactComponent as Gsap } from '../../../assets/icons/gsap.svg';
import { ReactComponent as Lottie } from '../../../assets/icons/lottie.svg';
import { ReactComponent as Jest } from '../../../assets/icons/jest.svg';
import { ReactComponent as NodeJs } from '../../../assets/icons/nodejs.svg';
import { ReactComponent as MongoDB } from '../../../assets/icons/mongodb.svg';
import { ReactComponent as Java } from '../../../assets/icons/java.svg';
import { ReactComponent as Flutter } from '../../../assets/icons/flutter.svg';
import { ReactComponent as GraphQL } from '../../../assets/icons/graphql.svg';
import { ReactComponent as D3js } from '../../../assets/icons/d3js.svg';
import { ReactComponent as WebGL } from '../../../assets/icons/webgl.svg';
import { ReactComponent as SocketIO } from '../../../assets/icons/socket-io.svg';
import CloseButton from '../../../components/ui/CloseButton';

const Skills = ({ closeContactModal }: {closeContactModal: ()=> void}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const reveal = element.querySelectorAll('.reveal');

    for (let i = 0; i < reveal.length; i++) {
      const tl = gsap.timeline();
      tl.to(
        reveal[i].querySelector('.reveal-mask'),
        {
          scaleX: 1,
          duration: 0.8 + i * 0.25,
          delay: 2,
        },
      );

      tl.add('reveal');
      tl.to(
        reveal[i].querySelector('.reveal-mask'),
        {
          scaleX: 0,
          transformOrigin: '100% 50%',
          duration: 0.5,
          delay: 0.2,
        },
        'reveal',
      );
      tl.to(
        reveal[i].querySelector('.reveal-text'),
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.2,
        },
        'reveal',
      );
    }

    if (window.innerWidth > 768) {
      const skillsLists = element.querySelectorAll('ul');
      for (let i = 0; i < skillsLists.length; i++) {
        const skills = skillsLists[i].querySelectorAll('li');
        for (let j = 0; j < skills.length; j++) {
          gsap.fromTo(
            skills[j],
            {
              opacity: 0,
              y: '50%',
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              delay: 3.2 + j * 0.2,
              ease: Power2.easeOut,
            },
          );
        }
      }
    } else {
      const skills = element.querySelectorAll('li');
      for (let j = 0; j < skills.length; j++) {
        gsap.fromTo(
          skills[j],
          {
            opacity: 0,
            y: '50%',
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            delay: 3.2 + j * 0.1,
            ease: Power2.easeOut,
          },
        );
      }
    }
  }, []);

  return (
    <div ref={ref} className="skills">
      <CloseButton onClick={closeContactModal} />
      <h2>Skills</h2>
      <div className="skills-content">
        <dl>
          <dt>
            <div className="reveal">
              <h3 className="reveal-text">
                Proficient in:
              </h3>
              <div className="reveal-mask" aria-hidden />
            </div>
          </dt>
          <dd>
            <ul>
              <li>
                <Bounce><ReactJS /></Bounce>
                <span>React</span>
              </li>
              <li>
                <Bounce><ReactNative /></Bounce>
                <span>React Native</span>
              </li>
              <li>
                <Bounce><Redux /></Bounce>
                <span>Redux</span>
              </li>
              <li>
                <Bounce><Angular /></Bounce>
                <span>Angular</span>
              </li>
              <li>
                <Bounce><NgRx /></Bounce>
                <span>NgRx</span>
              </li>
              <li>
                <Bounce><RxJs /></Bounce>
                <span>RxJs</span>
              </li>
              <li className="medium">
                <Bounce><TypeScript /></Bounce>
                <span>TypeScript</span>
              </li>
              <li className="medium">
                <Bounce><ES6 /></Bounce>
                <span>ES6</span>
              </li>
              <li className="medium">
                <Bounce><Sass /></Bounce>
                <span>Sass</span>
              </li>
              <li>
                <Bounce><Firebase /></Bounce>
                <span>Firebase</span>
              </li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            <div className="reveal">
              <h3 className="reveal-text">
                Familiar with:
              </h3>
              <div className="reveal-mask" aria-hidden />
            </div>
          </dt>
          <dd>
            <ul>
              <li className="medium">
                <Bounce><VueJs /></Bounce>
                <span>VueJs</span>
              </li>
              <li>
                <Bounce><Gsap /></Bounce>
                <span>Gsap</span>
              </li>
              <li className="medium">
                <Bounce><Lottie /></Bounce>
                <span>Lottie</span>
              </li>
              <li className="medium">
                <Bounce><Jest /></Bounce>
                <span>Jest</span>
              </li>
              <li>
                <Bounce><NodeJs /></Bounce>
                <span>Node.js</span>
              </li>
              <li>
                <Bounce><MongoDB /></Bounce>
                <span>MongoDB</span>
              </li>
              <li>
                <Bounce><SocketIO /></Bounce>
                <span>Socket.io</span>
              </li>
              <li>
                <Bounce><Java /></Bounce>
                <span>Java</span>
              </li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            <div className="reveal">
              <h3 className="reveal-text">
                Want to learn:
              </h3>
              <div className="reveal-mask" aria-hidden />
            </div>
          </dt>
          <dd>
            <ul>
              <li>
                <Bounce><Flutter /></Bounce>
                <span>Flutter</span>
              </li>
              <li>
                <Bounce><GraphQL /></Bounce>
                <span>GraphQL</span>
              </li>
              <li>
                <Bounce><D3js /></Bounce>
                <span>D3.js</span>
              </li>
              <li>
                <Bounce><WebGL /></Bounce>
                <span>WebGL</span>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default Skills;
