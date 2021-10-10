import './Sns.scss';
import { ReactComponent as GitHubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';

const Sns: React.FC<{}> = () => (
  <ul className="sns">
    <li>
      <a href="https://www.linkedin.com/in/humblotj/" aria-label="LinkedIn">
        <LinkedInIcon />
      </a>
    </li>
    <li>
      <a href="https://github.com/humblotj" aria-label="Github">
        <GitHubIcon />
      </a>
    </li>
  </ul>
);

export default Sns;
