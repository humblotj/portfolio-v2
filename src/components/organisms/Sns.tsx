import './Sns.scss';
import { ReactComponent as GitHubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as CodepenIcon } from '../../assets/icons/codepen.svg';
import { codepen, github, linkedin } from '../../utils/utils';

const Sns: React.FC<{}> = () => (
  <ul className="sns">
    <li>
      <a target="_blank" rel="noreferrer" href={linkedin} aria-label="LinkedIn">
        <LinkedInIcon />
      </a>
    </li>
    <li>
      <a target="_blank" rel="noreferrer" href={github} aria-label="Github">
        <GitHubIcon />
      </a>
    </li>
    <li>
      <a target="_blank" rel="noreferrer" href={codepen} aria-label="Codepen">
        <CodepenIcon />
      </a>
    </li>
  </ul>
);

export default Sns;
