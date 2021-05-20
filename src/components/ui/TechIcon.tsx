import { ReactComponent as ReactJS } from '../../assets/icons/react.svg';
import { ReactComponent as ReactNative } from '../../assets/icons/react-native.svg';
import { ReactComponent as Redux } from '../../assets/icons/redux.svg';
import { ReactComponent as Angular } from '../../assets/icons/angular.svg';
import { ReactComponent as NgRx } from '../../assets/icons/ngrx.svg';
import { ReactComponent as RxJs } from '../../assets/icons/rxjs.svg';
import { ReactComponent as TypeScript } from '../../assets/icons/typescript.svg';
import { ReactComponent as ES6 } from '../../assets/icons/es6.svg';
import { ReactComponent as Sass } from '../../assets/icons/sass.svg';
import { ReactComponent as Firebase } from '../../assets/icons/firebase.svg';
import { ReactComponent as VueJs } from '../../assets/icons/vuejs.svg';
import { ReactComponent as Gsap } from '../../assets/icons/gsap.svg';
import { ReactComponent as Jest } from '../../assets/icons/jest.svg';
import { ReactComponent as NodeJs } from '../../assets/icons/nodejs.svg';
import { ReactComponent as MongoDB } from '../../assets/icons/mongodb.svg';
import { ReactComponent as Java } from '../../assets/icons/java.svg';
import { ReactComponent as Flutter } from '../../assets/icons/flutter.svg';
import { ReactComponent as GraphQL } from '../../assets/icons/graphql.svg';
import { ReactComponent as D3js } from '../../assets/icons/d3js.svg';

const TechIcon = ({ name }: {name: string}) => {
  switch (name) {
    case 'React':
      return <ReactJS />;
    case 'React Native':
      return <ReactNative />;
    case 'Redux':
      return <Redux />;
    case 'Angular':
      return <Angular />;
    case 'NgRx':
      return <NgRx />;
    case 'TypeScript':
      return <TypeScript />;
    case 'Vue.js':
      return <VueJs />;
    case 'Gsap':
      return <Gsap />;
    default:
      return null;
  }
};

export default TechIcon;
