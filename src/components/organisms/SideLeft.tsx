import './SideLeft.scss';
import { ReactComponent as GitHubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../../assets/icons/codepen.svg';
import { codepen, github, linkedin, mail } from '../../utils/utils';

const SideLeft: React.FC<{}> = () => (
  <>
    <div className="side-left-sns linkedin blink">
      <a target="_blank" rel="noreferrer" href={linkedin} aria-label="LinkedIn">
        <LinkedInIcon />
      </a>
    </div>
    <div className="side-left-sns github blink">
      <a target="_blank" rel="noreferrer" href={github} aria-label="Github">
        <GitHubIcon />
      </a>
    </div>
    <div className="side-left-sns codepen blink">
      <a target="_blank" rel="noreferrer" href={codepen} aria-label="Codepen">
        <CodepenIcon />
      </a>
    </div>
    <div className="side-left blink" aria-hidden />
    <div className="side-right-mail blink">
      <a href={'mailto:' + mail}>{mail}</a>
    </div>
    <div className="side-right blink" aria-hidden />
  </>
);

export default SideLeft;
