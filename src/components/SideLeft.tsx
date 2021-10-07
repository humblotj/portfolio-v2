import './SideLeft.scss';
import { ReactComponent as GitHubIcon } from '../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../assets/icons/codepen.svg';

const SideLeft: React.FC<{}> = () => (
  <>
    <div className="side-left-sns linkedin blink">
      <a href="https://www.linkedin.com/in/humblotj/" aria-label="LinkedIn">
        <LinkedInIcon />
      </a>
    </div>
    <div className="side-left-sns github blink">
      <a href="https://github.com/humblotj" aria-label="Github">
        <GitHubIcon />
      </a>
    </div>
    <div className="side-left-sns codepen blink">
      <a href="https://codepen.io/humblotj" aria-label="Codepen">
        <CodepenIcon />
      </a>
    </div>
    <div className="side-left blink" aria-hidden />
    <div className="side-right-mail blink">
      <a href="mailto:jeanhumblot.dev@gmail.com">jeanhumblot.dev@gmail.com</a>
    </div>
    <div className="side-right blink" aria-hidden />
  </>
);

export default SideLeft;
