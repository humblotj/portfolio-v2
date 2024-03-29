import { ReactComponent as Angular } from 'assets/icons/angular.svg';
import { ReactComponent as Gsap } from 'assets/icons/gsap.svg';
import { ReactComponent as NextJs } from 'assets/icons/nextjs.svg';
import { ReactComponent as NgRx } from 'assets/icons/ngrx.svg';
import { ReactComponent as NodeJs } from 'assets/icons/nodejs.svg';
import { ReactComponent as ReactNative } from 'assets/icons/react-native.svg';
import { ReactComponent as ReactJS } from 'assets/icons/react.svg';
import { ReactComponent as Redux } from 'assets/icons/redux.svg';
import { ReactComponent as Spring } from 'assets/icons/spring.svg';
import { ReactComponent as TypeScript } from 'assets/icons/typescript.svg';
import { ReactComponent as VueJs } from 'assets/icons/vuejs.svg';

interface Props {
  name: string;
}

const TechIcon: React.FC<Props> = ({ name }) => {
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
    case 'Node.js':
      return <NodeJs />;
    case 'Spring':
      return <Spring />;
    case 'Next.js':
      return <NextJs color="#000" />;
    default:
      return null;
  }
};

export default TechIcon;
