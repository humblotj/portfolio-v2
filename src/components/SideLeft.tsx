import './SideLeft.scss';
import { ReactComponent as GitHubIcon } from '../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../assets/icons/codepen.svg';

const SideLeft = () => (
  <>
    <div className="side-left-sns linkedin blink fixed" data-bottom="210">
      <a href="https://www.linkedin.com/in/humblotj/" aria-label="LinkedIn">
        <LinkedInIcon />
      </a>
    </div>
    <div className="side-left-sns github blink fixed" data-bottom="165">
      <a href="https://github.com/humblotj" aria-label="Github">
        <GitHubIcon />
      </a>
    </div>
    <div className="side-left-sns codepen blink fixed" data-bottom="120">
      <a href="https://codepen.io/humblotj" aria-label="Codepen">
        <CodepenIcon />
      </a>
    </div>
    <div className="side-left blink fixed" aria-hidden data-bottom="0" />
    <div className="side-right-mail blink fixed" data-bottom="120">
      <a href="mailto:jeanhumblot.dev@gmail.com">jeanhumblot.dev@gmail.com</a>
    </div>
    <div className="side-right blink fixed" aria-hidden data-bottom="0" />
  </>
);

export default SideLeft;
